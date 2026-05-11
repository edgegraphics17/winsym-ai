// ============================================================
// WINSYM.AI — Supabase Client
// Loads via CDN — no build step required
// ============================================================

// Your Supabase credentials — set these in .env or replace directly
// In Vercel: add as Environment Variables (VITE_ prefix not needed for plain HTML)
const SUPABASE_URL = window.SUPABASE_URL || '__SUPABASE_URL__';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__';

// Init client (loaded via CDN script tag)
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ────────────────────────────────────────────────────────────
// CONTACTS — Contact form submission
// ────────────────────────────────────────────────────────────
async function submitContact({ firstName, company, email, service, message }) {
  const { data, error } = await db.from('contacts').insert([{
    first_name:  firstName,
    company:     company || null,
    email:       email,
    service:     service || null,
    message:     message || null,
    source_page: 'winsymai'
  }]);

  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// BOOKINGS — Discovery call / calculator booking
// ────────────────────────────────────────────────────────────
async function submitBooking({ name, email, company, service, packageTotal, packageItems, notes }) {
  const { data, error } = await db.from('bookings').insert([{
    name:          name,
    email:         email,
    company:       company || null,
    service:       service,
    package_total: packageTotal || null,
    package_items: packageItems || null,
    notes:         notes || null
  }]);

  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// LEADS — Email capture
// ────────────────────────────────────────────────────────────
async function submitLead({ email, name, source }) {
  const { data, error } = await db.from('leads').insert([{
    email:  email,
    name:   name || null,
    source: source || 'website'
  }]);

  // Ignore duplicate email errors gracefully
  if (error && error.code === '23505') return { duplicate: true };
  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// PAGE EVENTS — Anonymous analytics
// ────────────────────────────────────────────────────────────
async function trackEvent(page, eventType, eventData = {}) {
  // Fire and forget — don't block UX
  db.from('page_events').insert([{
    page:       page,
    event_type: eventType,
    event_data: eventData
  }]).then(() => {}).catch(() => {});
}

// Auto-track pageview on load
(function() {
  const pageMap = {
    'winsymai.html':          'home',
    'karim-identity.html':    'about',
    'projects-showcase.html': 'projects'
  };
  const fileName = window.location.pathname.split('/').pop() || 'winsymai.html';
  const pageName = pageMap[fileName] || fileName;
  trackEvent(pageName, 'pageview', { referrer: document.referrer || 'direct' });
})();
