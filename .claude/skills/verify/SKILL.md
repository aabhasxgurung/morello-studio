---
name: verify
description: Build, run, and visually verify the Maison Argyle storefront (Next.js + Lenis + GSAP).
---

# Verifying changes in this repo

## Build / launch

- `npm run build` — production build + TypeScript (Turbopack, ~5s).
- `npm run dev` — dev server on port 3000. **Check first if one is already
  running** (`next dev` refuses a second instance and reports the PID):
  if so, just drive http://localhost:3000 — it hot-reloads your edits.

## Driving the UI

No Playwright in the repo's deps; install it in the scratchpad
(`npm init -y && npm install playwright && npx playwright install chromium`)
and screenshot with a small node script.

Gotchas that will burn you:

- **Preloader + text reveals**: the hero copy animates in until ~4.5s after
  load (preloader curtain 2.4s + 1s word reveal). Screenshot before ~5s and
  the type is mid-flight — wait 5–6s after `networkidle` before judging
  layout.
- **Lenis smooth scroll**: `mouse.wheel` has momentum; a screenshot right
  after wheeling captures an in-between position. For a deterministic scroll
  position use `page.evaluate((y) => window.scrollTo(0, y), y)` then wait
  ~1.5s.
- **Footer reveal**: the footer is `md:sticky md:bottom-0` behind `<main>`
  (z-10, bg-cream). To capture the mid-reveal frame, scroll to
  `maxScroll - ~400`. On mobile widths it's normal flow.
- **`#contact` anchor** targets a sentinel div at the end of `<main>` in
  `app/layout.tsx`, not the footer (the footer is pinned, so its own rect
  can't be scrolled to).
- Listen for `console`/`pageerror` events in the script — GSAP/hydration
  issues surface there, not in the server log.

## Flows worth driving

- Home: hero reveal, product-card hover (image swap + size strip),
  category tiles, footer sticky reveal, navbar Contact anchor.
- Shop: `/shop` grid + `?c=` category filter; PDP at `/shop/<slug>`.
