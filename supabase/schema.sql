-- ============================================================
-- WINSYM.AI — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- 1. CONTACTS — Kontaktformular-Einreichungen
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  first_name    TEXT NOT NULL,
  company       TEXT,
  email         TEXT NOT NULL,
  service       TEXT,
  message       TEXT,
  status        TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  source_page   TEXT DEFAULT 'winsymai'
);

-- ────────────────────────────────────────────────────────────
-- 2. BOOKINGS — Discovery Call / Session-Anfragen
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  company       TEXT,
  phone         TEXT,
  service       TEXT NOT NULL,
  package_total INTEGER,        -- MYR total from calculator
  package_items JSONB,          -- selected calculator items
  notes         TEXT,
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  preferred_date DATE,
  timezone      TEXT DEFAULT 'Asia/Kuala_Lumpur'
);

-- ────────────────────────────────────────────────────────────
-- 3. LEADS — Newsletter & allgemeine Lead-Erfassung
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT,
  source        TEXT DEFAULT 'website',  -- 'ticker', 'footer', 'popup'
  tags          TEXT[] DEFAULT '{}',
  subscribed    BOOLEAN DEFAULT TRUE
);

-- ────────────────────────────────────────────────────────────
-- 4. PAGE_EVENTS — Simple Analytics (no cookies)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_events (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  page          TEXT NOT NULL,   -- 'home', 'about', 'projects'
  event_type    TEXT NOT NULL,   -- 'pageview', 'cta_click', 'calc_open', 'form_start'
  event_data    JSONB DEFAULT '{}'
);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Public can INSERT (forms), nobody can SELECT without auth
-- ────────────────────────────────────────────────────────────

ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads       ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (form submissions from website)
CREATE POLICY "Public can insert contacts"
  ON contacts FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can insert bookings"
  ON bookings FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public can insert page_events"
  ON page_events FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users (you, via dashboard) can read
CREATE POLICY "Auth users can read contacts"
  ON contacts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Auth users can read bookings"
  ON bookings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Auth users can read leads"
  ON leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Auth users can read page_events"
  ON page_events FOR SELECT TO authenticated USING (true);

-- Auth users can update status fields
CREATE POLICY "Auth users can update contacts"
  ON contacts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Auth users can update bookings"
  ON bookings FOR UPDATE TO authenticated USING (true);

-- ────────────────────────────────────────────────────────────
-- INDEXES for performance
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contacts_created   ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status    ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created   ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status    ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_leads_email        ON leads(email);
CREATE INDEX IF NOT EXISTS idx_page_events_page   ON page_events(page, event_type);
CREATE INDEX IF NOT EXISTS idx_page_events_time   ON page_events(created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 5. PROFILES — Extended user data (linked to auth.users)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  full_name     TEXT,
  email         TEXT,
  avatar_url    TEXT
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 6. COURSES — Course catalogue
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            TEXT PRIMARY KEY,  -- 'higgsfield-claude', 'pro-websites'
  title         TEXT NOT NULL,
  description   TEXT,
  total_steps   INTEGER NOT NULL DEFAULT 0,
  is_published  BOOLEAN DEFAULT TRUE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published courses"
  ON courses FOR SELECT USING (is_published = true);

-- Seed the two courses
INSERT INTO courses (id, title, description, total_steps, sort_order) VALUES
  ('higgsfield-claude', 'Higgsfield + Claude', 'Automate your full AI content pipeline in 11 steps.', 11, 1),
  ('pro-websites', 'Pro Websites with Claude Code', 'Build & deploy real websites — no code needed.', 10, 2)
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- 7. USER_PROGRESS — Per-user, per-course step tracking
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id       TEXT REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  step_number     INTEGER NOT NULL,        -- 1-based step index
  completed       BOOLEAN DEFAULT FALSE,
  completed_at    TIMESTAMPTZ,
  last_visited_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_id, step_number)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_progress_user_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_progress_completed   ON user_progress(user_id, course_id, completed);

-- ────────────────────────────────────────────────────────────
-- 8. USER_CERTIFICATES — Issued on 100% course completion
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_certificates (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id     TEXT REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  issued_at     TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  cert_code     TEXT UNIQUE DEFAULT 'CERT-' || upper(substr(md5(random()::text), 1, 8)),
  UNIQUE(user_id, course_id)
);

ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own certificates"
  ON user_certificates FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates"
  ON user_certificates FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_certs_user ON user_certificates(user_id);
