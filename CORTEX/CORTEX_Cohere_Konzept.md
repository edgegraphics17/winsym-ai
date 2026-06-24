# Konzept: CORTEX-Startseite im Cohere-Stil

**Datum:** 2026-06-24 · **Scope:** Neue Startseite für CORTEX (Produkt unter winsym.ai, eigene visuelle Sub-Identität — siehe Abschnitt 3) · **Referenz:** cohere.com/de · **Revenue-Filter:** MEDIUM ROI — CORTEX ist in der Bootstrap-Phase (noch kein gebautes Multi-Tenant-Produkt, Fokus liegt laut Business Plan auf den ersten 2–3 Referenzkunden services-led). Eine Website ist hier kein Ablenkungsmanöver, sondern direkt nützlich: als Credibility-Collateral für das Warm-Network-Vorgehen (8.2) und als Lead-Capture für den kostenlosen Maturity Assessment — beides unterstützt direkt den Abschluss der ersten Referenzkunden, nicht nur Optik.

---

## 1. Cohere-Analyse — was funktioniert und warum

| Section | Pattern | Warum es wirkt |
|---|---|---|
| Hero | Drei kurze Possessiv-Sätze ("Ihre eigene KI. Ihre Daten. Ihre Infrastruktur.") + ein knapper Schlusssatz mit Zurückhaltung ("Cohere belässt es dabei.") | Wirkt selbstbewusst statt verkäuferisch — die Kürze IST die Botschaft (Souveränität) |
| Logo-Marquee direkt unter Hero | Endlos-Scroll-Leiste mit Oracle, SAP, Salesforce, McKinsey, Accenture etc. (Logo-Set mehrfach wiederholt für nahtlosen Loop) | Vertrauen wird gezeigt, bevor irgendetwas erklärt wird — kein Scrollen nötig |
| 3-Spalten Value Props (Sicherheit/Bereitstellung/Anpassung) | Icon + 2-4 Wort-Headline + 1 Satz + "Mehr erfahren" | Keine Fließtext-Absätze — scanbar in 5 Sekunden |
| "North"-Produktspotlight | Echtes UI-Screenshot des Produkts neben kurzer Copy | Beweis statt Behauptung — das Produkt existiert sichtbar |
| Industrie-Karten (horizontal swipe/scroll) | Großformatige, stimmungsvolle Fotografie pro Branche, kaum Text, Klick führt zur Detailseite | Bild trägt die Botschaft, Branche fühlt sich "gesehen" statt aufgezählt |
| Tabbed Modell-Showcase (Command/Transcribe/Embed/Rerank) | Klick auf Tab wechselt Copy + Screenshot daneben | Besucher wählt selbst, was relevant ist — kein Overload |
| Testimonial mit Premium-Fotografie | Großes Editorial-Bild statt Stock-Headshot, kurzes Zitat | Wirkt redaktionell, nicht wie ein Erfahrungsbericht-Widget |
| Schluss-CTA + E-Mail-Capture | Eine Zeile + Formular, kein Scroll-Stopper davor | Niedrige Hemmschwelle direkt am Ende |

**Wichtig zur Einordnung:** `web_fetch` liefert nur den gerenderten Text/Markup, keine ausgeführten Animationen. Die "Swipe"-Mechanik der Industrie-Karten und der wiederholte Logo-Block (6× dieselben Logos im HTML) sind aus der Struktur klar erkennbar (das ist die Standard-Technik für einen endlosen Marquee bzw. einen horizontalen Scroll-Snap-Slider) — die exakte Easing/Timing wurde nicht direkt beobachtet, sondern aus dem Strukturmuster abgeleitet.

---

## 2. Gap-Analyse — CORTEX vs. Cohere & wie CORTEX nachziehen sollte

| Dimension | Cohere | CORTEX (heute) | Konsequenz |
|---|---|---|---|
| Produktreife | Live-Plattform, echte UI-Screenshots als Beweis | Pre-Build, Bootstrap-Phase (10.1) | Keine echten Screenshots fakebar — andere Beweisform nötig |
| Social Proof | Hunderte Enterprise-Logos | Null Referenzkunden bisher | Logo-Wand würde hohl wirken — andere Trust-Quelle nötig |
| Vertriebsmotion | Self-Serve (API-Key, sofortiger Zugriff) | Diagnose-geführt (Maturity Assessment → Demo → Pilot) | CTA-Logik muss sich unterscheiden, nicht kopieren |
| Käufer | Technisch, weiß bereits was er will | Nicht-technischer SME-Owner (8.1), kennt sein eigentliches Problem oft nicht | Mehr Führung nötig, weniger "Selbstbedienung" |
| Einzigartiger Hebel | Modell-Performance, Infrastruktur-Kontrolle | 5-Stufen-Maturity-Ladder — das hat Cohere nicht | Muss das visuelle Zentrum der Seite sein, nicht eine Randnotiz |

**Konkrete Anpassungsempfehlungen — wie CORTEX das Cohere-Niveau erreicht, ohne Cohere zu kopieren:**

1. **Ersetze Produkt-Screenshots durch die Live-Demo-Logik, die im Plan schon steht.** Cohere zeigt UI, weil es UI gibt. CORTEX hat (noch) keine deploybare Multi-Tenant-Oberfläche — aber das Business-Plan-Kapitel "Book Demo" beschreibt bereits den stärksten Beweis, den CORTEX hat: eine live, belegte Antwort aus einer Beispiel-Brain, gefolgt von einem bewussten "Ich weiß es nicht" auf eine Frage außerhalb des Wissens. Diese Verweigerung zu erfinden ist das Produktversprechen — das gehört prominent auf die Startseite (interaktives Demo-Widget statt Screenshot), nicht nur auf die Demo-Seite.
2. **Kein Logo-Marquee, solange keine Logos da sind.** Ein leerer oder "Coming Soon"-Platzhalter schadet mehr als er hilft. Stattdessen: Credibility-Anchor aus der PIOS-Herkunft ("Productized from a system built where one fabricated fact causes real damage") + Google/Meta-Partner-Badges + Gründer-Track-Record. Logo-Leiste erst aktivieren, wenn die ersten 2-3 Referenzkunden stehen (8.4).
3. **Tabbed Showcase: 8 Layer statt 4 Modelle.** Gleiches Cohere-Pattern (Tab-Klick wechselt Inhalt), aber Inhalt = die acht Brain-Layer (Knowledge/Operations/Marketing/Sales/Customer/Decision/Intelligence/Automation) mit Outcome-Statement + freigeschaltetem Maturity-Level statt Screenshot — ehrlich gegenüber dem Baustand.
4. **Industrie-Karten direkt wiederverwendbar.** Die sechs Templates (Recht, Medizin, Hotels, Immobilien, Agenturen, Restaurants) existieren bereits im Plan — gleiches Swipe-Pattern wie Cohere, aber mit einer Zeile Compliance-Hinweis pro Karte (Anwaltsgeheimnis, HIPAA/PDPA, Lebensmittelsicherheit), weil das bei regulierten Käufern der eigentliche Vertrauensauslöser ist — nicht nur die Branche.
5. **Die Maturity-Ladder ist der eine Vorteil, den Cohere nicht hat — sie gehört ins Zentrum.** Cohere verkauft Fähigkeit ("was unser Modell kann"). CORTEX verkauft Diagnose + Weg ("wo Sie stehen → wie Sie weiterkommen") — das ist für einen unentschlossenen, nicht-technischen SME-Käufer der stärkere Mechanismus. Empfehlung: ein klickbarer 5-Stufen-Stepper direkt unter dem Hero, nicht erst auf der Pricing-Seite versteckt.
6. **CTA-Reihenfolge umdrehen.** Der Plan-Entwurf hat "Demo buchen" primär, "Maturity Assessment" sekundär — das passt zu einem Käufer, der schon weiß, dass er KI-Infrastruktur will (Cohere-Zielgruppe). CORTEX' Zielgruppe weiß das oft nicht. Empfehlung: **Maturity Assessment primär** (niedrige Hemmschwelle, positioniert CORTEX als Diagnostiker), **Demo buchen sekundär**.
7. **Tonalität übernehmen, nicht den Inhalt.** Cohere's Trick ist die possessive Dreier-Kadenz + ein knapper Schlusssatz mit Zurückhaltung. Übertragen auf CORTEX' eigentliche Hero-Botschaft: *"Ihr Wissen. Ihre Antworten. CORTEX erfindet nichts dazu."* — gleiche Rhetorik, anderer Fokus (Wissen/Vertrauen statt Infrastruktur).

---

## 3. Visuelle Identität — CORTEX bekommt eine eigene Sub-Identität

CORTEX läuft unter winsym.ai, braucht aber einen eigenen visuellen Auftritt — bestätigt durch den bestehenden Investor-Deck-Stil (slide-01 bis slide-16), der sich klar von winsymai.html unterscheidet:

| Element | winsym.ai (Coaching, dunkel) | CORTEX (neu, hell) |
|---|---|---|
| Hintergrund | `#1C1917` dunkel | `#F5F2EE` Creme |
| Display-Font | Bebas Neue (Condensed Sans) | Bold Serif (Slab-Charakter, z. B. Fraunces) |
| Eyebrow-Label | — | Orange, klein, tracked, UPPERCASE |
| Cards | dunkle Surfaces | Creme-Karten (`#F0ECE4`), große Radien, weicher Schatten |
| Badges | — | Orange Kreis, weißes Icon/Häkchen |
| Abschluss-Pattern | — | Kursive, dunkle Ein-Satz-Zusammenfassung pro Section |
| Tabellen | — | Orange Header-Row, Creme/Weiß-Streifen |

Farbwerte und Bold-Sans bleiben markenkonform (`#C45A1A` Orange, DM Sans Body) — nur der Display-Font und der helle Grundton sind CORTEX-spezifisch, analog zu Cohere's hellem Grundton, aber mit eigener Editorial-Note statt Cohere's Foto-lastigem Look. Bewusst **keine Stock-Fotografie** (CLAUDE.md 3.5: keine generischen Stockbilder) — stattdessen ein abstraktes Knowledge-Graph-Motiv (Knoten/Linien), passend zum bisherigen Deck, das komplett ohne Personenfotos arbeitet.

---

## 4. Homepage-Konzept — Section-Mapping

| # | Section | Cohere-Pattern adaptiert | Inhalt (aus Business Plan 7.) |
|---|---|---|---|
| 1 | Nav | Mega-Menu-Idee vereinfacht auf Lösungen/Branchen/Preise/Case Studies | Logo CORTEX + kleiner "by winsym.ai"-Tag, CTA-Paar |
| 2 | Hero | Possessive Kurzsätze + Zurückhaltungssatz | *"Ihr Unternehmen hat bereits ein Gehirn. Es ist nur über Mitarbeiter, Dateien und Apps verstreut."* + Sub-Headline + Maturity-Assessment primär / Demo sekundär |
| 3 | Trust-Strip | Ersetzt Logo-Marquee | PIOS-Herkunft-Zeile + Google/Meta-Partner-Badges |
| 4 | Value Props | 3-Spalten Icon-Pattern | Wissen nie wieder verloren · Entscheidungen auf Evidenz · Built for trust |
| 5 | Maturity-Stepper | Ersetzt Produkt-Screenshot-Spotlight | Klickbarer 5-Stufen-Ladder — der Beweis-Moment der Seite |
| 6 | Solutions-Tabs | Tabbed Modell-Showcase | 8 Layer als Tabs, Outcome + Maturity-Level statt Screenshot |
| 7 | Industries | Swipe-Karten | 6 Vertikale + Compliance-Zeile pro Karte |
| 8 | Credibility-Block | Ersetzt Testimonial-mit-Foto | "Already in hand"-Checkliste (slide-11) |
| 9 | Pricing-Teaser | — | 4-Tier-Ladder als Reise, Region-Toggle MYR/EUR/USD |
| 10 | Schluss-CTA | E-Mail-Capture-Pattern | *"Bereit, das Gehirn Ihres Unternehmens zu bauen?"* + Formular |
| 11 | Footer | 4-Spalten-Pattern | Produkt/Lösungen/Branchen/Unternehmen + winsym.ai-Verweis + Impressum/Datenschutz (PDPA+GDPR, CLAUDE.md 3.6) |

---

## 5. Nächste Schritte

Gecodeter Prototyp (`CORTEX_Homepage_Prototype.html`) wird direkt im Anschluss gebaut — self-contained, responsive, mit echten Interaktionen (Tabs, Maturity-Stepper, Industry-Scroll-Snap). Danach Pflicht-Checks laut CLAUDE.md 3.4: `design:design-critique` + `design:accessibility-review` vor Abschluss, plus Screenshot-Verifikation.
