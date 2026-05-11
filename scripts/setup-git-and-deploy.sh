#!/bin/bash
# ============================================================
# WINSYM.AI — Git + Vercel Setup Script
# Führe dieses Script einmal im Terminal aus:
#   cd "/Users/karim/Documents/Claude/Projects/Winsym Coaching"
#   bash scripts/setup-git-and-deploy.sh
# ============================================================

set -e
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  winsym.ai — Git & Vercel Setup${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# ── STEP 1: Git init ─────────────────────────────────────────
echo -e "\n${YELLOW}[1/6] Initializing Git repository...${NC}"
git init
git branch -M main
git config user.email "work@edgegraphics.co"
git config user.name "Karim Azzaoui"
echo -e "${GREEN}✓ Git initialized${NC}"

# ── STEP 2: First commit ──────────────────────────────────────
echo -e "\n${YELLOW}[2/6] Creating first commit...${NC}"
git add winsymai.html karim-identity.html projects-showcase.html
git add js/ supabase/ scripts/ vercel.json .gitignore .env.example
git commit -m "🚀 Initial commit — winsym.ai full stack

- 3-page responsive website (Home, About, Projects)
- Shared navigation with hamburger mobile menu
- Supabase backend: contacts, bookings, leads, page_events
- Supabase JS client with form handling & event tracking
- Vercel config with env variable injection
- SQL schema with Row Level Security policies"
echo -e "${GREEN}✓ First commit created${NC}"

# ── STEP 3: GitHub remote ────────────────────────────────────
echo -e "\n${YELLOW}[3/6] GitHub remote setup${NC}"
echo -e "  Go to: ${CYAN}https://github.com/new${NC}"
echo -e "  Create a repo named: ${CYAN}winsym-ai${NC} (private)"
echo -e "  Then come back here and press Enter."
read -p "  Press Enter when the GitHub repo is created..."

echo -e "  Enter your GitHub username:"
read GITHUB_USER

git remote add origin "https://github.com/${GITHUB_USER}/winsym-ai.git"
git push -u origin main
echo -e "${GREEN}✓ Pushed to GitHub: github.com/${GITHUB_USER}/winsym-ai${NC}"

# ── STEP 4: Supabase credentials ─────────────────────────────
echo -e "\n${YELLOW}[4/6] Supabase credentials${NC}"
echo -e "  1. Go to: ${CYAN}https://supabase.com/dashboard${NC}"
echo -e "  2. Open your project (or create one named 'winsym-ai')"
echo -e "  3. Go to: Settings → API"
echo -e "  4. Copy 'Project URL' and 'anon public' key"
echo ""
read -p "  Paste your Supabase Project URL: " SUPABASE_URL
read -p "  Paste your Supabase anon key: " SUPABASE_ANON_KEY

# Save to .env (local only, gitignored)
cat > .env << EOF
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
EOF
echo -e "${GREEN}✓ .env file created (gitignored)${NC}"

# ── STEP 5: Run SQL schema in Supabase ───────────────────────
echo -e "\n${YELLOW}[5/6] Supabase database schema${NC}"
echo -e "  1. Go to: ${CYAN}https://supabase.com/dashboard${NC}"
echo -e "  2. Open your project → SQL Editor"
echo -e "  3. Click 'New query'"
echo -e "  4. Open and paste the contents of: ${CYAN}supabase/schema.sql${NC}"
echo -e "  5. Click 'Run'"
echo ""
read -p "  Press Enter when the SQL has been run in Supabase..."
echo -e "${GREEN}✓ Supabase schema ready${NC}"

# ── STEP 6: Vercel deployment ────────────────────────────────
echo -e "\n${YELLOW}[6/6] Vercel deployment${NC}"

# Check if vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo -e "  Vercel CLI found — deploying now..."
    vercel --prod \
      -e SUPABASE_URL="${SUPABASE_URL}" \
      -e SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY}"
else
    echo -e "  Vercel CLI not found. Deploy via browser instead:"
    echo -e "  1. Go to: ${CYAN}https://vercel.com/new${NC}"
    echo -e "  2. Import: ${CYAN}github.com/${GITHUB_USER}/winsym-ai${NC}"
    echo -e "  3. Add Environment Variables:"
    echo -e "     ${CYAN}SUPABASE_URL${NC} = ${SUPABASE_URL}"
    echo -e "     ${CYAN}SUPABASE_ANON_KEY${NC} = ${SUPABASE_ANON_KEY}"
    echo -e "  4. Click Deploy"
    echo ""
    echo -e "  Or install Vercel CLI first with:"
    echo -e "  ${CYAN}npm install -g vercel${NC}"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ winsym.ai is live!${NC}"
echo -e ""
echo -e "  GitHub:   ${CYAN}github.com/${GITHUB_USER}/winsym-ai${NC}"
echo -e "  Vercel:   ${CYAN}winsym-ai.vercel.app${NC} (or your custom domain)"
echo -e "  Supabase: ${CYAN}View leads & contacts in your Supabase dashboard${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
