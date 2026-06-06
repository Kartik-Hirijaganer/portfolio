# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is
Kartik Hirijaganer's personal portfolio — a **static, single-page website**. No backend, **no build step, no package manager**. Built on the **EasyFolio** template (BootstrapMade) with **Bootstrap 5.3.3** and vanilla JavaScript.

## File map
- `index.html` — **ALL content lives here** (hero, about, experience, portfolio, skills, education, certificates, contact). Editing content = editing this one file.
- `assets/css/main.css` — theme + all styles (CSS custom properties defined in `:root`).
- `assets/js/main.js` — behavior: nav, AOS init, Isotope filters, Swiper carousel, contact form (opens a Gmail draft).
- `assets/vendor/*` — third-party libs: **AOS** (scroll animations), **Swiper** (carousel), **Isotope** + **imagesLoaded** (portfolio masonry/filter), **GLightbox**, **Waypoints**.
- `assets/img/`, `assets/pdf/` — images and the downloadable résumé.
- `.github/workflows/static.yml` — GitHub Pages deploy.
- `docs/portfolio-refresh-plan.md` — current content-refresh + skeleton-loading plan.

## Color theme — DO NOT change the `:root` variables
The brand theme is fixed. Reuse these tokens; never hard-code new colors:
- `--accent-color: #e87532` (orange) · `--heading-color: #0f2943` (navy) · `--default-color: #0a0f14`
- `--background-color` / `--surface-color: #ffffff` · light sections `#faf9fb` · dark `#060606`
- Fonts: **Roboto** (body), **Questrial** (headings), **Noto Sans** (nav).

Build any new UI (e.g., skeleton loaders) from these tokens via `color-mix(...)`.

## Run / preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
No build, no install — just edit and refresh.

## Deploy
GitHub Pages via `.github/workflows/static.yml` on push to `main`. **Only `index.html` + `assets/` are published** (the workflow stages them into `dist/`), so repo docs/config — `CLAUDE.md`, `docs/`, `.claude/`, `README.txt`, `LICENSE.txt` — are **not** exposed on the public site. Keep it that way when editing the workflow.

## Conventions
- Content edits go in `index.html`; preserve the theme and the existing class structure.
- Writing voice: humanized, **problem → approach → result**, plain English, keep the metrics. **No PHI, secrets, or sensitive implementation details** in copy (healthcare context).
- Accessibility: mark decorative/loading elements `aria-hidden="true"`; honor `prefers-reduced-motion`.

## Gotchas
- `AOS`, `Swiper`, and the Isotope filter wiring all initialize on **`window.load`** in `main.js`; Isotope measures card positions via `imagesLoaded`. Anything that overlays/animates on load (e.g., skeletons) must avoid mutating the real DOM layout so these stay correct.
- Experience/education section anchor `id`s are referenced by the nav dropdown — keep them in sync when adding/reordering roles.

## Skills / tools
No custom project skill is needed for a static site — use the built-in `/run`, `/verify`, and `/code-review` for preview and review.
