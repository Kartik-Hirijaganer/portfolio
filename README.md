# Kartik Hirijaganer Portfolio

Personal portfolio for Kartik R. Hirijaganer, an AI Engineer and Technical Lead focused on production LLM systems, healthcare software, data engineering, and full-stack product delivery.

Live site: [kartik-hirijaganer.github.io/portfolio](https://kartik-hirijaganer.github.io/portfolio/)

Current release: `v3.0.0`

## What This Is

This repository contains a static, single-page portfolio website. The site highlights professional experience, AI and software projects, technical skills, education, certifications, and contact information.

The portfolio is built to communicate three things clearly:

| Signal | Why It Matters |
|---|---|
| AI engineering depth | Shows production LLM, agentic AI, intake automation, and healthcare AI work |
| Software delivery | Demonstrates full-stack, backend, cloud, and data-platform execution |
| Technical leadership | Leads with the current Technical Lead role and cross-functional delivery experience |

## Release 3.0.0 Highlights

`v3.0.0` is the major portfolio refresh release.

| Area | Update |
|---|---|
| Positioning | Reframed the site around AI Engineer, Software Engineer, and Technical Lead opportunities |
| Experience | Added Premier Health Group Technical Lead role and refreshed experience copy |
| Projects | Reordered portfolio work to lead with AI, LLM, and agentic systems |
| New work | Added Briefed LLM Email Triage App and Executive Pay Analysis Datathon Winner |
| UX polish | Added section-by-section skeleton loading for a smoother first-load experience |
| Maintenance | Fixed stale copy, typo issues, resume path, navigation anchors, and deploy artifact scope |

## Tech Stack

| Layer | Tools |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, Bootstrap 5.3.3, Bootstrap Icons |
| Interactions | Vanilla JavaScript |
| Animations | AOS, section skeleton loaders |
| Portfolio layout | Isotope, imagesLoaded |
| Carousel | Swiper |
| Media viewer | GLightbox |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions |

No package manager or build step is required.

## Project Structure

| Path | Purpose |
|---|---|
| `index.html` | All portfolio content and section markup |
| `assets/css/main.css` | Theme, layout, component styles, skeleton loading styles |
| `assets/js/main.js` | Navigation, filters, carousel setup, contact form, skeleton reveal |
| `assets/img/` | Site images, certificates, portfolio thumbnails |
| `assets/pdf/` | Resume PDF |
| `.github/workflows/static.yml` | GitHub Pages deployment workflow |
| `docs/releases/` | Versioned GitHub release note drafts |
| `CHANGELOG.md` | Release history |

## Local Preview

Run a local static server from the repository root:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Deployment

The site deploys to GitHub Pages from `main` using `.github/workflows/static.yml`.

The workflow stages only the public website files:

```text
index.html
assets/
```

This keeps repository-only files such as docs, local agent configuration, and release planning files out of the deployed Pages artifact.

## Release Workflow

For a new portfolio release:

1. Update `README.md` with the current release version and live-site context.
2. Add a new entry to `CHANGELOG.md`.
3. Add or update the release note draft in `docs/releases/`.
4. Verify locally with `python3 -m http.server 8000`.
5. Tag the release, for example `v3.0.0`.
6. Create a draft GitHub release first.
7. Publish only after the deployed GitHub Pages site is verified.

## Verification Checklist

Before publishing a release:

- Hero, About, Experience, Portfolio, Skills, Education, Certifications, and Contact sections render correctly.
- Resume download points to `assets/pdf/Kartik-Hirijaganer_Resume.pdf`.
- Portfolio filters animate and preserve layout.
- Certificate carousel works.
- Skeleton loaders appear briefly and fade out without shifting layout.
- Navigation anchors jump to the correct sections and timeline entries.
- Contact form opens the expected Gmail draft flow.
- Mobile layout works below `768px`.
- GitHub Pages deployment succeeds.

## Privacy Guardrails

Portfolio copy should stay high-level and public-safe:

- Do not include PHI, secrets, credentials, internal URLs, or sensitive implementation details.
- Keep healthcare and compliance examples focused on outcomes and architecture-level descriptions.
- List only shipped work and skills that can be discussed in an interview.

## Credits

This portfolio is based on the [EasyFolio](https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/) template by [BootstrapMade](https://bootstrapmade.com/). The required template credit remains in the site footer.
