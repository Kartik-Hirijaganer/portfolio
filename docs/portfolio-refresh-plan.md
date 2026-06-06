# Portfolio Content Refresh + Section-by-Section Skeleton Loading

> **Handoff note (for the next agent).** Part 0 (repo Claude setup) is **already complete — do not redo it** (don't re-edit `.github/workflows/static.yml`, `CLAUDE.md`, `.claude/`, `.gitignore`). Your job is **Part 1 — content rewrite in `index.html`** and **Part 2 — skeleton loading** (`index.html` + `assets/css/main.css` + `assets/js/main.js`). Throughout this doc, **"you" / "your" = Kartik** (the repo owner). Static site, no build/install — preview with `python3 -m http.server 8000`. The full proposed copy is inline; **write it verbatim** unless Kartik says otherwise. **Suggested order:** §1.1 global fixes → §1.4 experience → §1.5 portfolio → §1.2–1.3 hero/about → §1.6 skills → §1.7–1.8 education/certs/contact → Part 2 skeleton → verify. **Definition of done:** the *Stale content to eliminate* sweep returns zero hits **and** the *Verification* checklist passes. Resolved choices + the 2 items to confirm with Kartik are in *Decisions & defaults for the executing agent* (bottom).

## Context

Kartik's portfolio ([index.html](index.html)) is a single-page static site (Bootstrap 5.3.3, vanilla JS, no build step) where **all content is hardcoded in `index.html`**. Two things are now out of date:

1. **Content is stale.** Kartik was promoted to **Technical Lead** at Premier Health Group (Jan 2026), but the site still lists him only as "AI Engineer Intern" and a "graduate student." His latest resume ([Kartik-Hirijaganer_Resume.pdf](assets/pdf/Kartik-Hirijaganer_Resume.pdf)) has new roles, new projects (Briefed, a Datathon win), and a clear shift toward **AI / LLM + software engineering**. The resume is intentionally terse (space-limited); the portfolio should be the *fuller, warmer* version for someone who wants to dig in.
2. **No loading polish.** The page renders with no perceived-performance treatment. Kartik wants a **section-by-section skeleton shimmer** that makes the site feel like a modern, well-crafted product.

**Goals:** (a) rewrite every content block in plain, humanized, hiring-manager-friendly language that makes Kartik *stand out*; (b) reorder projects so the most relevant (AI/LLM) lead; (c) add a section-by-section skeleton loading animation; (d) **keep the exact color theme** (`--accent-color: #e87532` orange, `--heading-color: #0f2943` navy, Roboto/Questrial fonts — root variables untouched).

**Your confirmed decisions (these are locked):** Positioning = *"open to opportunities,"* lead with Technical Lead. UMD Lab Ambassador = *kept.* New project cards = *add both Briefed and Datathon; portfolio showcases MORE than the resume.* Skeleton = *section-by-section shimmer (~0.8s), fades into real content.*

**Reconciliation of the two draft plans:** This plan keeps your locked decisions and grafts in the teammate plan's genuinely better ideas — the Briefed **Live Demo** link (and *not* inventing a GitHub link), the **AI + Software Engineer** target-role framing in About/Contact, a **tighter skills grouping**, a **stale-content sweep**, and a **privacy guardrail**. Where the teammate conflicted with your choices (remove UMD, prune projects, images-only skeleton), your choices win.

---

## Part 0 — Repository Claude setup ✅ DONE (do not redo)

**This part is already complete — every file below already exists in the repo.** The next agent should skip straight to Part 1. Summary kept here for context (and so nobody re-edits the deploy workflow). These files were created on the working tree but are **not yet committed** unless Kartik has since committed them.

**⚠️ Deploy gotcha I found:** [.github/workflows/static.yml](.github/workflows/static.yml) publishes the **entire repo** to GitHub Pages on every push to `main` (`path: '.'`). So any file added at the repo root — a `CLAUDE.md`, the plan — would become **publicly downloadable** at your Pages URL (e.g. `…/CLAUDE.md`, `…/docs/portfolio-refresh-plan.md`). The setup therefore includes a one-line protective change so only the actual site is published.

**Files created / changed (already in the repo):**

1. **`CLAUDE.md`** (repo root) — the project "rules" every future Claude session auto-loads:
   - What it is: static **EasyFolio / Bootstrap 5.3.3** site, vanilla JS, **no build step / package manager**.
   - File map: `index.html` = ALL content (single page) · `assets/css/main.css` = theme + styles · `assets/js/main.js` = behavior · `assets/vendor/*` = AOS, Swiper, Isotope, GLightbox, Waypoints.
   - **Locked color theme** (never edit the `:root` vars): `--accent-color #e87532` · `--heading-color #0f2943` · `--default-color #0a0f14` · `--background`/`--surface #ffffff` · light `#faf9fb` / dark `#060606`; fonts Roboto / Questrial / Noto Sans.
   - Preview: `python3 -m http.server 8000` → `localhost:8000` (no build).
   - Deploy: GitHub Pages on push to `main`; **only `index.html` + `assets/` are published** (change #4).
   - Conventions: content lives in `index.html`; preserve the theme; humanized "problem → approach → result" voice; accessibility (`aria-hidden` on decorative, honor `prefers-reduced-motion`); **no PHI / secrets in copy**.
   - Gotchas: AOS / Swiper / Isotope init on `window.load`; Isotope measures card positions via `imagesLoaded`.
   - Pointer to the plan at `docs/portfolio-refresh-plan.md`.

2. **`.claude/settings.json`** — project settings with a small, conservative permission allowlist so safe, common commands don't prompt (local preview server + read-only git: `git status` / `diff` / `log`). Nothing destructive; no auto-approval of writes or network.

3. **`docs/portfolio-refresh-plan.md`** — a copy of THIS plan, version-controlled and linked from `CLAUDE.md`. This is the "save it there."

4. **`.github/workflows/static.yml`** — add a staging step so only the site ships:
   ```yaml
   - name: Stage site files
     run: |
       mkdir dist
       cp -r index.html assets dist/
   - name: Upload artifact
     uses: actions/upload-pages-artifact@v3
     with:
       path: 'dist'
   ```
   Same public site, same URLs — but `CLAUDE.md`, `docs/`, `.claude/`, `README.txt`, `LICENSE.txt` stop being exposed.

**Skills:** a custom project skill isn't needed for a static site — built-in `/run`, `/verify`, `/code-review` already cover preview/verification. I'll note that in `CLAUDE.md` rather than add ceremony. (Say the word for a dedicated "update-portfolio" skill.)

**Remaining work (the next agent's job):** Parts 1–2 below — the content rewrite in `index.html` and the skeleton loading. `index.html` content has **not** been touched yet.

---

## Writing voice (applies to ALL copy)

Every bullet follows one pattern so the whole site sounds like one confident, human person:

> **Business problem → technical approach → measurable result**, with the tech stack as a quiet tag in parentheses.

- **Lead with the outcome a non-engineer cares about.** Keep the numbers (15×, 84%→98%, $20M/day) — those are what hiring managers screenshot.
- **Plain English over jargon.** "watches insurance payer portals" not "monitors payer portal endpoints."
- **First person, warm, specific.** Short sentences with a little personality ("tame inbox overload," "gives clinicians back ~20 minutes").
- **Unique angle:** *"I build and ship production AI in a hard, regulated domain — healthcare — and lead the team that ships it."* This thread runs through Hero → About → Experience.
- **Privacy guardrail:** copy stays high-level — no PHI, no internal secrets, no sensitive implementation specifics.

Full proposed copy is below so you approve the actual words, not just the approach.

---

## Part 1 — Content rewrite (`index.html`)

### 1.1 `<head>`, branding, nav, global fixes
- **`<title>`** (line 7) → `Kartik Hirijaganer — AI Engineer & Technical Lead`
- **`<meta description>`** (line 8) → one-line pitch (*"AI & software engineer and current Technical Lead building production LLM and data systems in healthcare. I turn messy real-world problems into AI products people actually use."*) + fill **keywords**.
- **Footer branding** (line 1019): `EasyFolio` → `Kartik R. Hirijaganer`. (BootstrapMade credit link on line 1031 stays — license requirement.)
- **Resume download link** (line 320): `assets/pdf/Kartik_Hirijaganer_Resume.pdf` → **`assets/pdf/Kartik-Hirijaganer_Resume.pdf`** (old underscore file was deleted; this link is currently **broken**).
- **Fix scrambled anchor IDs + nav dropdown** (lines 56–68, 220–298, 805): experience IDs are mismatched today (`id="umd"` on Premier, `id="biz2x"` on UMD, `id="capgemini"` on Biz2Credit). Re-map to honest IDs (`premier-lead`, `premier-intern`, `umd-lab`, `biz2credit`, `capgemini`; education `umd-edu`, `mumbai-edu`) and update the nav `Experience`/`Education` dropdown links + labels to match (add the new Technical Lead entry).
- **Typo fixes:** `Progamming`→`Programming`, `Hapdoop`→`Hadoop`, `Searborn`→`Seaborn`, `Januray`→`January`, `Lets Connect`→`Let's Connect`, and `LanGraph`→`LangGraph` (wrong on the resume too).
- **Email consistency:** show `kartikh@terpmail.umd.edu` (matches resume) in both About card (line 198) and Contact (line 950, currently typo'd `kartikh.terpmail@umd.edu`). Contact-form Gmail target in [main.js:237](assets/js/main.js#L237) stays. *(Flag: terpmail is a student address that may expire — confirm if you'd prefer a personal/work email shown.)*

### 1.2 Hero (lines 100–120)
- **Headline (`h2`):** `AI Engineer & Technical Lead` (leads with your current role, per your choice). *Alt if you prefer pure target-role framing: "AI & Software Engineer."*
- **Lead line:** *"I build production AI systems that ship — LLM-powered services, real-time backends, and the cloud software around them — and I lead the team that builds them. Currently Technical Lead at Premier Health Group, working at the messy intersection of AI and healthcare."*
- **CTA buttons:** keep `View My Work` / `Let's Connect`.
- **Stats:** `5+ Years Experience` · `10+ Projects Shipped` · `15× Faster AI Decisions` (impact-forward 3rd stat). *Alt: swap in `98% Compliance` or `6 Engineers Led` — tunable.*

### 1.3 About (lines 146–200)
Rewrite the three intro paragraphs (you've graduated and been promoted):
- *"I'm Kartik — an AI and software engineer who just finished my M.S. in Information Systems at the University of Maryland (GPA 3.94) and now leads product engineering as Technical Lead at Premier Health Group."*
- *"I build things that have to work in the real world: HIPAA-compliant healthcare products that read documents, listen to clinical sessions, score referrals, and make decisions in real time — built on FastAPI services, LLM pipelines, WebSockets/Redis, and AWS. I like owning a problem end-to-end, from architecture to the team that ships it."*
- *"I'm currently a Technical Lead and open to **AI Engineer and Software Engineer** roles where I can build and lead AI products that matter — always happy to connect with people building interesting things."* (your "open to opportunities" + the teammate's target-role framing)
- **Personal-info card:** keep Name/Phone/Email; **replace `Age — 27 Years`** with **`Location — College Park, MD`** (more useful; age invites bias and is uncommon on US profiles). *(Say the word to keep age.)*

### 1.4 Experience timeline (lines 219–299) — now **5 roles**, most-recent-first
Order: **Premier (Technical Lead) → Premier (Intern) → UMD Lab → Biz2Credit → Capgemini.** Your two strongest, most recent AI roles lead; the UMD lab role (kept per your call — the teammate wanted it removed) sits in its natural chronological spot. *(Trivial to move it dead-last if you prefer.)*

**① Premier Health Group — Technical Lead · Jan 2026 – Present** *(new role)*
- Designed and built an AI **patient-intake service** that watches insurance payer portals, reads incoming referrals, and uses an LLM to score them — auto-approving the clear ones and routing tricky cases to a human, **~15× faster** than the manual process. *(FastAPI, Celery, Anthropic API, PostgreSQL, Redis, AWS ECS)*
- Built an **ambient "listening" assistant** for 90-minute behavioral-health sessions: it transcribes with Whisper/GPT-4o and auto-drafts the clinical notes, giving clinicians back **~20 minutes per session** — privacy enforced end-to-end (HIPAA & 42 CFR Part 2) via LLMGuard. *(Whisper, GPT-4o, LLMGuard, Statsig, FastAPI)*
- Launched a **real-time compliance dashboard** for home-visit care (EVV) using WebSockets + Redis Pub/Sub that flags late check-ins and geofence violations the moment they happen — lifting visit compliance from **84% to 98%+**. *(React, TypeScript, FastAPI, Redis, PostgreSQL, AWS ECS)*
- **Led a 6-person cross-functional team** to ship **Release 1.0** of a HIPAA-compliant SaaS platform — scoping and architecting **15+ features across web and mobile in 15 weeks**, no missed milestones. *(React, Flutter, FastAPI, AWS, Terraform, Agile/Scrum)*

**② Premier Health Group — AI Engineer Intern · Jun 2025 – Dec 2025** *(title/dates corrected; old Textract/Llama/cert-alert bullets replaced)*
- Created an **AI intake assistant** that reads long referral documents (up to ~60 pages) and pre-fills patient forms in **under 90 seconds** — each field carries a confidence score so staff know exactly what to double-check. *(Python, Gemini, Claude/Anthropic API, OpenRouter, multimodal AI)*
- Shipped a stateless, HIPAA-compliant **EDI eligibility tool** that validates Medicaid patient eligibility and catches data mismatches before claims go out — raising the clean-claim rate from **74% to 94%**. *(Python, FastAPI, React, Terraform, AWS, X12 EDI)*
- *(If the earlier OCR/Textract or Angular-UI work from this period is still accurate and you want it shown, confirm and I'll add it as a 3rd bullet — defaulting to the resume's two to avoid stale revisions.)*

**③ University of Maryland — Graduate Lab Ambassador · Sep 2024 – May 2025** *(kept; lightly humanized)*
- Built a MySQL inventory database (AWS RDS) and an interactive Tableau dashboard to track **2,000+ pieces of lab equipment** in real time.
- Ran day-to-day lab operations — prepping equipment, flagging gear for repair/replacement, and supporting the professor during sessions.

**④ Biz2Credit — Data Engineer · Jan 2023 – Jul 2024** *(title corrected from "Software Engineer"; old EMR/Redshift/Tableau bullets replaced with latest resume)*
- Built a **batch reporting pipeline for HSBC** processing **10,000+ loan decisions/day**, rolling credit metrics (approval rates, score distributions, turnaround) into Snowflake — the BI dashboards on top saved the team **~15 hours of manual reporting every week**. *(Python, dbt, Snowflake, Airflow, SQL)*
- Built **ETL pipelines** ingesting bank statements, credit-bureau feeds, and financial APIs — processing **$20M+ in daily transactions** with **<5-minute data freshness** for downstream ML models. *(Airflow, dbt, Snowflake, S3, AWS Kinesis)*
- *(Optional 3rd — confirm it's the same role: the existing site lists a LangChain natural-language→SQL chatbot with Redshift guardrails. Strong AI story; I'll keep it if accurate.)*

**⑤ Capgemini — Software Engineer · Sep 2020 – Jan 2023** *(title corrected from "Associate Consultant")*
- As the **sole engineer**, built the cloud integration connecting **SUBWAY ↔ ezCater across 10,000+ stores** — phased rollout, **zero production incidents**. *(AWS, API Gateway, Lambda, DynamoDB, CloudFormation)*
- Dug through **50M+ system logs** to trace a **4% order-cancellation** problem to stale store inventory, then built pre-order validation + real-time inventory sync that cut cancellations **75%+ to under 1%**. *(AWS Lambda, EventBridge, DynamoDB Streams)*
- *(Kept from existing site, fuller-portfolio extra)* Automated coupon processing with an S3 + Lambda + DynamoDB workflow, removing **~95%** of the manual effort.

### 1.5 Portfolio (lines 352–587) — reorder **AI-first** + add 2 cards (keep all; no pruning)
Reorder the `.portfolio-item` blocks so LLM/agentic work leads (matches your AI-engineer positioning). Descriptions rewritten in the humanized voice. **The teammate suggested pruning 4 projects — not doing that, since you want the portfolio to showcase more.** Final order:

| # | Project | Category | Notes |
|---|---------|----------|-------|
| 1 | **Briefed — LLM Email Triage App** | Generative AI | **NEW** · **Live Demo** link only |
| 2 | Multi-Agent Affiliate Automation Platform | Agentic AI | **rewrite** of the `genAI.png` card (dual-agent story) |
| 3 | AI-Powered Chrome Extension (InboxIQ) | Agentic AI | keep; existing GitHub link stays |
| 4 | Real-Time Consumer Complaint Intelligence Platform | Data Engineering | keep, humanize |
| 5 | YouTube Trending Insights — AWS Data Pipeline | Data Pipeline | keep |
| 6 | Predicting Patient Survival | Machine Learning | keep |
| 7 | **Executive Pay Analysis — Datathon Winner** | Machine Learning | **NEW** |
| 8 | Suicide Analysis on World Data | Data Analysis | keep |
| 9 | Personal Finance Tracker | Full Stack | keep |
| 10 | PM Simulation — DeliveryCorps | Project Management | keep |
| — | Smart Inventory Bot (AI Workshop) | AI Workshop | keep; reframe per resume (`filter-workshops`) |

**Links policy (no invented references):** Briefed → **Live Demo** `https://d2vki955e8ckrc.cloudfront.net/login` *(from your resume's hyperlink — please confirm it's the correct public URL; it points at a /login page)*. **No GitHub link for Briefed** unless you give me one. Datathon → no external link unless provided. Existing cards keep their current real GitHub links.

**New / rewritten card copy:**
- **Briefed:** *"Started from a problem I had myself — inbox overload across several accounts. So I built an LLM-powered triage app: you set simple rules for senders and topics, and it sorts unread mail into clean categories with short summaries, turning a full inbox into a quick morning read. Routes calls through OpenRouter (Gemini 2.0 Flash, Claude Haiku fallback), hosted on AWS via Terraform with Supabase/Postgres, at near-zero cost."* (React, FastAPI)
- **Datathon:** *"A Datathon-winning project: I trained a Random Forest pipeline on 2.8M+ federal records (IRS 990, SAM.gov, USAspending) to predict executive pay, hitting R²=0.86 — and found job title, organization type, and grant funding to be the biggest drivers."*
- **Multi-Agent (rewrite):** *"A two-agent system that takes manual affiliate outreach off people's plates. Agent 1 navigates vendor portals and submits partnership applications (30+ vendors); Agent 2 watches Gmail, classifies the approval/rejection replies, and auto-drafts marketplace listings with the right pricing and attachments — cutting vendor onboarding time ~70%."*
- **Smart Inventory Bot (reframe):** *"Co-facilitated an AI workshop for small-business owners and built the demo — a natural-language tool that turns plain questions into SQL, runs them against the warehouse, and returns clean, readable answers."*

**Thumbnails for the 2 new cards:** no image files exist yet. I'll render an **on-theme gradient placeholder** in the card's image slot (`linear-gradient(135deg, var(--heading-color), var(--accent-color))` + a centered Bootstrap icon — `bi-envelope-paper` for Briefed, `bi-bar-chart` for Datathon). Keeps the 16/10 image area and the theme with **no new asset dependency**; drop real screenshots into `assets/img/portfolio/` later and I'll swap filenames in.

### 1.6 Skills (lines 600–788) — reorganized into 8 categories *(Kartik-approved structure)*
Same grid markup & theme — each category becomes an `<h2>`, each skill a `.skill-box` (the responsive `col-lg-3` grid handles the longer list fine). Replaces the old long alphabetical list; drop the dated entries (R, Java, HIVE, PIG, standalone Hadoop, Azure HDCluster, Neo4j, Microsoft Suite, individual algorithm boxes). Categories are ordered by signal strength — **lead with AI/LLM**.

1. **AI & LLM Engineering** *(core identity — lead with it):* LangGraph · LangChain · RAG · Multi-Agent Systems · Prompt Engineering · Vector Databases · Embeddings · Claude API · OpenAI API · Hugging Face · LlamaIndex · Retrieval Pipelines · Agentic Workflows · MCP (Model Context Protocol)
2. **Machine Learning** *(model-layer depth):* XGBoost · scikit-learn · SHAP (Explainability) · TensorFlow · PyTorch · NLP · Classification · Anomaly Detection · Feature Engineering · Model Evaluation
3. **Backend & APIs** *(SDE credibility):* Python · FastAPI · Node.js · Express.js · REST APIs · JWT Authentication · Microservices · WebSockets · Celery · Supabase · PostgreSQL · MongoDB · Redis
4. **Cloud & Infrastructure** *(production readiness):* AWS (Lambda, S3, EC2, ECS, ECR, CloudFormation, Redshift, Kinesis) · Terraform · Docker · GitHub Actions · CI/CD · IaC · Azure · LLMOps
5. **Data Engineering** *(pipeline depth):* SQL · Apache Spark · ETL Pipelines · Snowflake · dbt · Airflow · Pandas · X12 EDI (Healthcare) · HL7 FHIR · HIPAA-Compliant Pipelines
6. **Frontend** *(full-stack proof):* React · Angular · TypeScript · JavaScript · HTML5 · CSS3 · Bootstrap · Tailwind CSS · Flutter · PWA
7. **Domain Expertise** *(rare differentiator — typically absent from peer profiles):* Healthcare IT (HIPAA, EVV, Prior Auth, X12 EDI) · Home Health Agencies · FinTech (Loan Origination, Banking Reporting) · Compliance & Audit Trails

**Certifications:** keep exactly the three already in the portfolio — **AWS Certified Data Engineer – Associate**, **AWS Certified Developer – Associate**, **Certified Scrum Master** (shown in the Certificates carousel, §1.7). Make **no changes** to the Certificates section.

⚠️ **Honesty check before publishing** (a portfolio invites interview questions — ship only skills Kartik can speak to live). These come from the research note and are **not** on his résumé — confirm or drop each: `Node.js` · `Express.js` · `JWT` · `LlamaIndex` · `MCP` · `Vector Databases` · `Embeddings` · `HL7 FHIR` · `PWA` · `LLMOps`. **List only shipped work — no planned or aspirational skills/projects.**

### 1.7 Education (lines 805–828) & Certificates (lines 873–919)
- UMD: GPA `3.9` → **`3.94`**; dates `2024-2025` → **`Aug 2024 – Dec 2025`**; keep courses; fix anchor IDs.
- Mumbai: unchanged (Bachelor of Engineering, GPA 7.52, 2016–2020).
- Certificates: keep all three; fix `Januray` typo. No structural change.

### 1.8 Contact (lines 940–967)
Reframe to resolve the employed-vs-seeking tension (the teammate's good line): *"I'm currently a Technical Lead at Premier Health Group and open to **AI Engineer and Software Engineer** opportunities. Whether you're hiring, building, or just want to talk AI and healthcare tech — I'd love to hear from you."* Keep the Gmail-draft form, map link, info items; fix the email typo; full street address → `College Park, MD`.

---

## Part 2 — Section-by-section skeleton loading

**Design principle (the safe part):** the skeleton is an **overlay**, not a content swap. Each section gets an absolutely-positioned `.section-skeleton` div sitting *on top of* the real, fully-rendered content. On load it fades out. Because the real DOM/layout is never altered, **`AOS`, `Isotope` (which measures card positions via `imagesLoaded`), and `Swiper` — all of which init on `window.load` in [main.js](assets/js/main.js) — keep working untouched.** Built entirely from existing theme tokens. *(The teammate proposed images-only with no delay; honoring your section-by-section choice instead, with the delay tunable.)*

### 2.1 CSS — append a new block to [main.css](assets/css/main.css)
```css
/* Skeleton Loading (theme-driven shimmer) */
@keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.section-skeleton {
  position: absolute; inset: 0; z-index: 6;
  background-color: var(--background-color);
  padding: 60px 0; overflow: hidden;
  transition: opacity .5s ease, visibility .5s ease;
}
.skeleton-bone {
  border-radius: 8px;
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--heading-color), transparent 93%) 25%,
    color-mix(in srgb, var(--accent-color),  transparent 88%) 37%,
    color-mix(in srgb, var(--heading-color), transparent 93%) 63%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}
.skeleton-title { height: 42px; width: 320px; margin: 0 auto 24px; }
.skeleton-line  { height: 14px; margin-bottom: 12px; }
.skeleton-card  { height: 280px; border-radius: 15px; }    /* portfolio */
.skeleton-box   { height: 86px;  border-radius: 8px; }      /* skills */
.skeleton-img   { border-radius: 16px; min-height: 320px; } /* hero / about */
.skeleton-circle{ width: 16px; height: 16px; border-radius: 50%; } /* timeline dot */

body.loaded .section-skeleton { opacity: 0; visibility: hidden; pointer-events: none; }

@media (prefers-reduced-motion: reduce) { .skeleton-bone { animation: none; } }
```
- Add `position: relative;` to host sections (hero, about, experience, portfolio, skills, education, certificates, contact) — they already have `overflow: clip`, so this is additive and safe.
- Subtle stagger via per-section `transition-delay` for the "section-by-section" reveal feel.
- *(Optional complement, teammate-inspired):* give `.portfolio-image` a faint shimmer background that clears on `img` load, since lazy images may still arrive after the overlay fades.

### 2.2 HTML — one overlay per section in [index.html](index.html)
Inside each host `<section>`, add (as first child) a `.section-skeleton` overlay whose "bones" mirror that section's shape, reusing Bootstrap grid columns so it's responsive for free:
- **Hero:** two cols — left = `skeleton-title` + 3 `skeleton-line`s + two pill bones; right = `skeleton-img`.
- **Portfolio:** a `row g-4` of 4–6 `col-lg-6` `skeleton-card`s.
- **Skills:** ~12 `col-lg-3` `skeleton-box`es.
- **Experience/Education:** 3–4 timeline rows (`skeleton-circle` + short/long lines).
- **About / Certificates / Contact:** title bone + a couple of line/img bones.

All overlays carry `aria-hidden="true"`.

### 2.3 JS — reveal logic in [main.js](assets/js/main.js)
```js
// Skeleton reveal: keep skeletons visible >= MIN_MS, then fade in real content
(function () {
  const MIN_MS = 800, start = performance.now();
  function reveal() {
    const wait = Math.max(0, MIN_MS - (performance.now() - start));
    setTimeout(() => document.body.classList.add('loaded'), wait);
  }
  window.addEventListener('load', reveal);
  setTimeout(reveal, 3000); // safety net if load is slow / never fires
})();
```
Toggling `body.loaded` only fades the overlays — real content beneath is already initialized, so the existing init sequence is unchanged.

---

## Critical files
- [index.html](index.html) — all content (1.1–1.8) + skeleton overlay markup (2.2). The biggest edit.
- [assets/css/main.css](assets/css/main.css) — append skeleton styles (2.1) + `position: relative` on host sections. **No color/theme variables touched.**
- [assets/js/main.js](assets/js/main.js) — append the reveal block (2.3). Existing handlers untouched.
- [assets/pdf/Kartik-Hirijaganer_Resume.pdf](assets/pdf/Kartik-Hirijaganer_Resume.pdf) — already in place; only the link string in `index.html` changes.
- *(Optional, later)* `assets/img/portfolio/briefed.png`, `datathon.png` — real thumbnails to replace gradient placeholders.

## Stale content to eliminate (sweep — serves your "no stale references / no previous revisions")
After editing, the site must contain **none** of: `AI Engineer Intern` as the current/only role · `graduate student` / `student` wording · `actively seeking full-time` · the old intern bullets (Textract/Llama/cert-alert/Angular) · old Biz2Credit bullets (EMR/Redshift/Tableau) · `Associate Consultant` · `Kartik_Hirijaganer_Resume.pdf` (underscore) · `EasyFolio` branding · typos (`Progamming`, `Hapdoop`, `Searborn`, `Januray`, `LanGraph`) · email typo (`kartikh.terpmail@umd.edu`) · GPA `3.9` (→ 3.94) · scrambled anchor IDs.

## Verification
1. **Serve locally:** `python3 -m http.server 8000` → open `http://localhost:8000`.
2. **Skeleton:** on load each section shows the orange/navy shimmer ~0.8s, then fades section-by-section into real content. Throttle the network (DevTools) to confirm it appears; hard-refresh to re-trigger. Confirm OS "reduce motion" freezes the shimmer.
3. **Theme unchanged:** spot-check accent `#e87532`, navy headings, fonts, hover states, section-title gradient — identical to before.
4. **Content:** Technical Lead present and first; 5 experience entries with correct titles/dates; projects in AI-first order with **Briefed** (Live Demo only) and **Datathon** cards (gradient placeholders); skills regrouped; About/Hero/Contact reflect "open to AI Engineer & Software Engineer."
5. **Stale sweep:** grep the rendered HTML for every term in the list above — expect zero hits.
6. **No regressions:** portfolio filters animate (Isotope); certificate carousel slides (Swiper); AOS fade-ups fire on scroll; nav dropdown anchors jump to the right roles; **resume download works** (hyphen filename); contact form opens a Gmail draft.
7. **Responsive:** check ≤768px — skeleton overlays and new cards reflow correctly.
8. *(Optional)* drive it with the Claude Preview / Chrome MCP tools to screenshot the skeleton state and the final page.

## Decisions & defaults for the executing agent
All of these were settled during planning. **Apply the stated default and don't block.** The two marked ⚠️ should be confirmed with Kartik — proceed with the default and call them out in your summary if he's unavailable.

- ⚠️ **Briefed Live Demo URL** — use `https://d2vki955e8ckrc.cloudfront.net/login` (from Kartik's résumé; it's a /login page). **No GitHub link** for Briefed unless Kartik supplies one.
- ⚠️ **Email to display** — use `kartikh@terpmail.umd.edu` in both the About card and Contact (may expire post-grad). Leave the contact-form Gmail target in `main.js` unchanged.
- **Age field** — replace `Age — 27 Years` with `Location — College Park, MD`.
- **Skills** — apply the **8-category structure** in §1.6 (Kartik-approved). Honor the ⚠️ honesty check: confirm-or-drop the research-added skills not on his résumé, and list only shipped work (no planned/aspirational items). **Certs: keep the 3 already in the portfolio** — make no changes to the Certificates section.
- **Biz2Credit 3rd bullet** (LangChain NL→SQL chatbot) and **earlier intern OCR/Angular work** — **omit by default** (avoid stale revisions); add back only if Kartik confirms they're accurate.
- **Hero headline & 3rd stat** — use `AI Engineer & Technical Lead` + `15× Faster AI Decisions` (alternatives noted in §1.2).
- **New-card thumbnails** (Briefed, Datathon) — use the on-theme gradient + Bootstrap-icon placeholder from §1.5; don't block on missing image files.
