# AI Content Mastery — Live Quiz (winsym.ai)

A self-contained, multi-page interactive quiz (15 questions) for the AI Content Mastery coaching. Built for live use: show a question, take answers from the room, reveal the correct answer + a short teaching explanation, then move on. Ends with a score and a discovery-call CTA.

- **Live teaching mode:** each question reveals the correct answer + explanation after an answer is chosen.
- **Keyboard friendly (great on a projector):** keys `A–D` or `1–4` to answer, `Enter`/`Space` for next.
- **No build step, no dependencies.** Pure HTML/CSS/JS in one file.
- **Brand:** winsym.ai — orange `#C45A1A`, ink `#1C1917`, cream `#F5F2EE`; Bebas Neue / DM Sans / DM Mono.

## Deploy to Vercel

**Option A — drag & drop (fastest)**
1. Go to https://vercel.com/new
2. Drag this whole `quiz` folder onto the page (or click "deploy a folder").
3. Done — you get a live URL like `ai-content-quiz.vercel.app`.

**Option B — Vercel CLI**
```bash
cd quiz
npx vercel        # preview
npx vercel --prod # production
```

**Option C — GitHub**
Push this folder to a repo and import it at https://vercel.com/new. No framework preset needed (it's static).

## Run locally
Just open `index.html` in a browser, or:
```bash
cd quiz && python3 -m http.server 8080
# visit http://localhost:8080
```

## Edit the questions
All 15 questions live in the `QUESTIONS` array near the top of the `<script>` in `index.html`. Each entry: `seg`, `q`, `options` (4), `correct` (0-based index), `explain`, `ref`. Add or change freely — the score and progress bar adjust automatically.
