#!/usr/bin/env node
// ============================================================
// inject-env.js — Vercel build script
// Replaces %%SUPABASE_URL%% and %%SUPABASE_ANON_KEY%% in HTML
// files with actual environment variable values at build time.
// ============================================================

const fs   = require('fs');
const path = require('path');

const SUPABASE_URL      = process.env.SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  SUPABASE_URL or SUPABASE_ANON_KEY not set — Supabase features will not work.');
}

const htmlFiles = [
  'winsymai.html',
  'karim-identity.html',
  'projects-showcase.html'
];

const root = path.join(__dirname, '..');

htmlFiles.forEach(function(file) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  content = content
    .replace(/%%SUPABASE_URL%%/g,      SUPABASE_URL)
    .replace(/%%SUPABASE_ANON_KEY%%/g, SUPABASE_ANON_KEY);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Injected env into', file);
});

console.log('✓ Build complete — winsym.ai ready for Vercel');
