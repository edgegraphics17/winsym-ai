# Konzept: Smooth Theme-Wechsel + Key-Point-Highlighting

**Datum:** 2026-06-24 · **Scope:** winsymai.html (Live-Homepage) + css/design-system.css (academy/dashboard/courses) · **Revenue-Filter:** MEDIUM ROI — kein Bottleneck (das ist Lead-Volumen), aber direkter Hebel auf Conversion, weil genau die Stellen betroffen sind, die am meisten Gewicht tragen müssen: Pricing, CTAs, Company-Brain-Stats.

---

## 1. Diagnose — warum es sich falsch anfühlt

Code-Check ergab drei konkrete Ursachen, keine davon ist "Geschmackssache":

| Problem | Ursache im Code |
|---|---|
| Dark Mode wirkt zu hart | `--color-surface: #0c0c0c` ist fast Pure-Black — heller als `--color-bg` (#1C1917), aber in die falsche Richtung: dunkler statt sanfter abgestuft. Karten/Modals auf dieser Surface stechen als schwarzes Loch heraus. |
| Light Mode wirkt zu grell | `--color-surface: #FAF8F4` ist fast Pure-White und liegt heller als `--color-bg` (#F5F1EB). Gleicher Fehler gespiegelt: Card-Flächen "leuchten" gegen den ohnehin schon hellen Hintergrund. |
| Wechsel ist nicht smooth | `theme.js` setzt `data-theme` direkt per `setAttribute` — kein Transition-Rule in `design-system.css` greift dabei (keine globale `transition` auf `background-color`/`color`). Der Wechsel ist ein harter Cut, kein Crossfade. |

**Zusätzlicher Fund (Challenge):** `winsymai.html` hat einen **eigenen, separaten** Token-Satz (`--black`, `--white`, `--orange`) im `<style>`-Block statt der Tokens aus `css/design-system.css` (`--color-bg`, `--color-text`, `--color-orange`) zu nutzen. Heißt: jede Farbkorrektur muss aktuell doppelt gepflegt werden — Homepage und Academy/Dashboard können auseinanderlaufen. Empfehlung: das im selben Zug beheben, sonst hält der Fix nicht lange.

---

## 2. Lösung — 3 Bausteine

### Baustein A — Tonwerte entschärfen (Token-Fix, kein Redesign)

Kein neues Farbschema nötig — nur die Ausreißer in der bestehenden Stufenleiter `bg → bg-raised → bg-elevated → surface` korrigieren, sodass nichts mehr an Pure-Black oder Pure-White grenzt:

| Token | Dark — aktuell | Dark — neu | Light — aktuell | Light — neu |
|---|---|---|---|---|
| `--color-bg` | `#1C1917` | unverändert | `#F5F1EB` | unverändert |
| `--color-surface` | `#0c0c0c` | `#17140F` (zwischen bg und bg-raised) | `#FAF8F4` | `#EFEAE1` (zwischen bg-raised und bg) |
| Body-Text (Fließtext) | `#F5F2EE` | für lange Absätze `#E8E3DA` (gedimmt, Headlines bleiben `#F5F2EE`) | `#2C2416` | unverändert (bereits kein Pure-Black) |

Effekt: Dark Mode bleibt dunkel und markant (Brand-Kontrast bleibt erhalten), aber nichts mehr "kippt" in Pure-Black. Light Mode bleibt hell, aber Cards/Surfaces "leuchten" nicht mehr gegen den Cream-Hintergrund.

### Baustein B — echter Crossfade statt hartem Cut

Statt pauschal `transition: all` auf `*` zu legen (Performance-Risiko, ungewollte Seiteneffekte auf Hover/Transform-Animationen), zwei kombinierte Mechanismen:

**1. View Transitions API** (Chrome/Edge/Safari 18+) für einen weichen Crossfade beim Klick auf den Theme-Toggle:

```js
// js/theme.js
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme') || 'light';
  var next = current === 'dark' ? 'light' : 'dark';

  if (!document.startViewTransition) {
    applyTheme(next); // Fallback: Browser ohne Support
    return;
  }
  document.startViewTransition(function () { applyTheme(next); });
}

function applyTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('winsym-theme', next);
  // ... bestehendes Button-Label-Update
}
```

```css
/* design-system.css */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 550ms;
  animation-timing-function: var(--ease-inout);
}
```

**2. Fallback-Transition** für Browser ohne View-Transition-Support — gezielt auf Theme-tragende Elemente, nicht auf `*`:

```css
body, nav, .card, .ws-stat-card, .highlight-block, .ws-callout {
  transition: background-color 400ms var(--ease-inout),
              color 400ms var(--ease-inout),
              border-color 400ms var(--ease-inout);
}
```

`prefers-reduced-motion`-Regel ist in `design-system.css` bereits vorhanden (Zeile 218) — greift automatisch auch hier, kein Zusatzaufwand.

### Baustein C — ein verbindliches Highlight-System für Key Points

Gute Nachricht: Die Bausteine existieren schon im `ds-bundle` (Callout.html, StatCard.html) und nutzen bereits theme-fähige Tokens (`--color-orange-faint`, `--color-orange-glow`) — sie passen sich also automatisch an Dark/Light an, sobald Baustein A + die Token-Vereinheitlichung stehen. Das Problem ist nicht das Fehlen eines Systems, sondern die **inkonsistente Nutzung**:

| Komponente | Einsatz | Status |
|---|---|---|
| `.highlight-block` (Orange-Wash + linker Border) | Eine zentrale Aussage pro Section (z. B. 100K-Ziel, Pricing-Hinweis) | existiert, kaum auf Homepage genutzt |
| `.ws-callout` (Orange Left-Border, italic) | Zitate/Testimonials | existiert |
| `.ws-stat-card` / `stat-callout` | Zahlen (MYR 12,000, 30 Tage, 5 Phasen) | existiert, Homepage hat eigene Inline-Stats statt der Komponente |
| **Neu:** `.ws-mark` (inline) | Einzelne Schlüsselwörter in Fließtext markieren, ohne Hintergrund-Fläche — nur Farbe + Weight-Shift via `--color-orange` | zu bauen, 5 Zeilen CSS |

Sobald die Homepage auf dieselben Tokens + Komponenten wie Academy/Dashboard umgestellt ist, wirkt jedes Highlight in beiden Modi automatisch korrekt — kein Pflegeaufwand pro Theme.

---

## 3. Umsetzungsreihenfolge

| # | Schritt | Datei(en) | Aufwand |
|---|---|---|---|
| 1 | `--color-surface` in beiden Themes korrigieren, Body-Text-Dimming für Dark | `css/design-system.css` | klein |
| 2 | View-Transition-Wrap in Toggle-Funktion + Fallback-Transition | `js/theme.js`, `css/design-system.css` | klein |
| 3 | Homepage-Tokens auf `css/design-system.css` umstellen (Duplikat auflösen) | `winsymai.html` | mittel — größter Posten |
| 4 | `.ws-mark` Inline-Highlight bauen, Highlight-Block/Stat-Cards auf Homepage ausrollen (Hero-Stats, Company-Brain-Phasen, Pricing) | `winsymai.html` | mittel |
| 5 | WCAG-AA-Kontrastcheck (gemilderte Werte dürfen 4.5:1 nicht unterschreiten) + Design-Critique vor Go-Live | `design:accessibility-review`, `design:design-critique` | Pflicht laut CLAUDE.md 3.4 |
| 6 | Screenshot-Workflow: Homepage, Mobile, beide Themes | — | Pflicht laut CLAUDE.md 3.4 |

---

## Nächster Schritt

Sag "Jarvis, setz das um" und ich implementiere Schritt 1–4 direkt im Code, danach Accessibility-Check + Screenshots vor Go-Live.
