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
