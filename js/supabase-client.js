// ============================================================
// WINSYM.AI — Supabase Client
// Loaded via CDN — no build step required
// ============================================================

const SUPABASE_URL     = 'https://rkyqluymaafxypaphumo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreXFsdXltYWFmeHlwYXBodW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNjQ2MjMsImV4cCI6MjA2MTk0MDYyM30.VXwItyFOpfr91nmRVMjm4mriIGNXzb2PkILDa3rZ7Uc';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ────────────────────────────────────────────────────────────
// AUTH — helpers
// ────────────────────────────────────────────────────────────
async function signUp(email, password, fullName) {
  const { data, error } = await db.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  await db.auth.signOut();
}

async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

async function getProfile(userId) {
  const { data, error } = await db.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}

// ────────────────────────────────────────────────────────────
// ACADEMY PROGRESS
// ────────────────────────────────────────────────────────────

// Get all completed steps for a user+course
async function getCourseProgress(userId, courseId) {
  const { data, error } = await db
    .from('user_progress')
    .select('step_number, completed, last_visited_at')
    .eq('user_id', userId)
    .eq('course_id', courseId);
  if (error) return [];
  return data || [];
}

// Mark a step as visited (upsert)
async function visitStep(userId, courseId, stepNumber) {
  const { error } = await db.from('user_progress').upsert({
    user_id: userId,
    course_id: courseId,
    step_number: stepNumber,
    last_visited_at: new Date().toISOString()
  }, { onConflict: 'user_id,course_id,step_number' });
  if (error) console.warn('visitStep error:', error);
}

// Mark a step complete
async function completeStep(userId, courseId, stepNumber) {
  const { error } = await db.from('user_progress').upsert({
    user_id: userId,
    course_id: courseId,
    step_number: stepNumber,
    completed: true,
    completed_at: new Date().toISOString(),
    last_visited_at: new Date().toISOString()
  }, { onConflict: 'user_id,course_id,step_number' });
  if (error) console.warn('completeStep error:', error);
}

// Get the last visited step for a course (for "continue" CTA)
async function getLastStep(userId, courseId) {
  const { data } = await db
    .from('user_progress')
    .select('step_number')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .order('last_visited_at', { ascending: false })
    .limit(1)
    .single();
  return data ? data.step_number : 1;
}

// Issue a certificate if not already issued
async function issueCertificate(userId, courseId) {
  const { data: existing } = await db
    .from('user_certificates')
    .select('id, cert_code, issued_at')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();
  if (existing) return existing;

  const { data, error } = await db
    .from('user_certificates')
    .insert({ user_id: userId, course_id: courseId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Get all certificates for a user
async function getCertificates(userId) {
  const { data } = await db
    .from('user_certificates')
    .select('*, courses(title)')
    .eq('user_id', userId);
  return data || [];
}

// ────────────────────────────────────────────────────────────
// CONTACTS
// ────────────────────────────────────────────────────────────
async function submitContact({ firstName, company, email, service, message }) {
  const { data, error } = await db.from('contacts').insert([{
    first_name:  firstName,
    company:     company || null,
    email,
    service:     service || null,
    message:     message || null,
    source_page: 'winsymai'
  }]);
  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// BOOKINGS
// ────────────────────────────────────────────────────────────
async function submitBooking({ name, email, company, service, packageTotal, packageItems, notes }) {
  const { data, error } = await db.from('bookings').insert([{
    name, email,
    company:       company || null,
    service,
    package_total: packageTotal || null,
    package_items: packageItems || null,
    notes:         notes || null
  }]);
  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// LEADS
// ────────────────────────────────────────────────────────────
async function submitLead({ email, name, source }) {
  const { data, error } = await db.from('leads').insert([{
    email,
    name:   name || null,
    source: source || 'website'
  }]);
  if (error && error.code === '23505') return { duplicate: true };
  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// PAGE EVENTS
// ────────────────────────────────────────────────────────────
async function trackEvent(page, eventType, eventData = {}) {
  db.from('page_events').insert([{ page, event_type: eventType, event_data: eventData }])
    .then(() => {}).catch(() => {});
}

(function() {
  const pageMap = {
    'winsymai.html':          'home',
    'karim-identity.html':    'about',
    'projects-showcase.html': 'projects',
    'academy.html':           'academy',
    'dashboard.html':         'dashboard'
  };
  const fileName = window.location.pathname.split('/').pop() || 'winsymai.html';
  trackEvent(pageMap[fileName] || fileName, 'pageview', { referrer: document.referrer || 'direct' });
})();
