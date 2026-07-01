# Plan: Add Astro & Rebuild openteams.com

Migrate this repo from a single static maintenance page to an **Astro** site that
recreates the openteams.com homepage. Content is reconstructed from the Wayback
Machine snapshot (`20260624175430`) since the live site is down.

Existing brand assets in `assets/` (logos, favicon) and the palette/type already
documented in `README.md` are reused as-is.

---

## 1. Goals & scope

- **In scope:** Astro project setup, a faithful recreation of the homepage, shared
  layout (header nav + footer), reusable section components, and brand styling.
- **Out of scope (stub for now):** interior pages (Blog, Case Studies, About,
  Careers, product pages). Nav links point to `#` placeholders or anchors until
  those pages are built in a follow-up.
- **Keep:** `assets/`, brand tokens, the maintenance page (moved to `/maintenance`).

## 2. Tech choices

| Concern        | Choice                                                    |
| -------------- | --------------------------------------------------------- |
| Framework      | Astro (static output, zero JS by default)                 |
| Styling        | Plain CSS with design tokens (port existing `styles.css`) |
| Fonts          | Inter Tight (display) + Inter (body) — already in use     |
| Package mgr    | npm                                                       |
| Node           | LTS (>= 20)                                               |
| Deploy target  | Static host (`astro build` → `dist/`)                     |

Rationale: the site is content/marketing, not app-like — Astro's static islands
give fast pages with no runtime framework. Sticking with hand-authored CSS + the
existing token set avoids introducing Tailwind churn for a one-page rebuild.

## 3. Project setup steps

1. `npm create astro@latest` into a temp dir, then merge into repo root (or init
   in place). Choose: empty template, TypeScript (strict), npm.
2. Move current static files: `index.html` → `src/pages/maintenance.astro`
   (kept as a route), `styles.css` → `src/styles/tokens.css` (split tokens vs.
   page styles), leave `assets/` in place and reference from `public/`.
3. Add `public/` and copy `assets/*` there (Astro serves `public/` at web root),
   OR configure `assets/` as a static dir. Prefer moving to `public/assets/`.
4. `.gitignore`: add `node_modules/`, `dist/`, `.astro/`.
5. Scripts in `package.json`: `dev`, `build`, `preview`.
6. Update `README.md` with the new dev/build workflow.

## 4. Design tokens (from README + styles.css)

- Colors: navy `#022791`, blue `#4D75FE`, coral `#FF8A69`, amber `#FAA944`.
- Type: Inter Tight (display), Inter (body), Google Fonts.
- Define as CSS custom properties in `src/styles/tokens.css`, imported globally
  via the base layout.

## 5. Components to build

Under `src/components/`:

- `Header.astro` — sticky nav: logo + menu (Capabilities, Resources ▾,
  Company ▾, **Contact Us** button). Dropdowns for Resources/Company.
- `Footer.astro` — columns (Company, Resources, Communities & Events, Partners),
  social icons, newsletter subscribe, copyright + legal links.
- `Section.astro` / layout primitives — reusable wrapper for consistent spacing.
- `Card.astro` — capability / case-study / product cards.
- Section components matching the homepage (see §6).

Under `src/layouts/`:

- `BaseLayout.astro` — `<head>` (title, meta description, favicon, fonts),
  imports tokens, slots Header + `<slot/>` + Footer.

## 6. Homepage sections (in order, from the snapshot)

Recreate `src/pages/index.astro` composed of these sections:

1. **Hero** — eyebrow "AI You Own"; headline "Owned Intelligence. Built for
   Enterprise."; sub "The open infrastructure, tools, and expertise to build AI
   your organization actually owns, not rents."; CTA "Get Your Owned-Intelligence
   Score".
2. **Trust bar** — "Trusted by the teams building the future of AI" + logo row.
3. **The Problem** — "Today's AI Is Rented. The Value Isn't Yours." with four
   points:
   - You're paying to build someone else's asset.
   - Off-the-shelf AI isn't built for your problems. (<30% of CEOs satisfied)
   - The model is fundamentally misaligned with compliance. (147+ countries)
   - AI is an Expense, Not an Asset.
4. **The Opportunity** — "Building the Infrastructure for a Distributed AI
   Economy" + 3 stages:
   - STAGE 01 — Your AI Owned Intelligence Hub
   - STAGE 02 — Your Intelligence Hub Connects Outward
   - STAGE 03 — The Distributed Applied AI Economy
5. **How It Works / Products** — "Yours to keep." with 3 tiers:
   - 01 / FOUNDATION — The Nebari Ecosystem → "Explore Nebari"
   - 02 / Just Released · Free — Collab Desktop App → "Explore OpenTeams Collab"
   - 03 / Enterprise Deployment — Intelligence Hub / Nexus → "Explore OpenTeams Nexus"
6. **Why OpenTeams®** — "Not another AI startup." + 4 differentiators:
   - Built by the creators of modern AI's foundations
   - Open source DNA, enterprise delivery
   - The adoption hedge on the AI supercycle
   - An army of forward-deployed engineers
7. **Use Cases** — "Owned AI, in production." + 4 case cards (BioTech,
   Investments Firm, Government/JATIC-DoD, Energy) → "View all case studies".
8. **Final CTA** — "The AI You Keep Starts Here" + "Talk to Us".
9. **Footer** — (via `Footer.astro`).

> Copy the exact body text from `scratchpad/ot-archive.html` extraction captured
> during planning; a content-mapping doc (`docs/content-map.md`) will hold the
> full verbatim copy per section.

## 7. Assets & images

- Reuse existing logos in `assets/` (horizontal + white variants, favicon).
- Customer/case-study logos and hero imagery from the snapshot are not committed
  yet — use styled placeholders (or pull from the archive) and flag for design
  follow-up. Do **not** hotlink Wayback URLs.

## 8. Responsiveness & a11y

- Mobile-first CSS; hamburger menu for the header under `md`.
- Semantic landmarks (`header`/`main`/`footer`/`nav`), alt text on logos,
  keyboard-navigable dropdowns, sufficient color contrast on navy/coral.

## 9. Verification

- `npm run dev` → visual pass against the snapshot at desktop + mobile widths.
- `npm run build && npm run preview` → confirm static output, no console errors.
- Basic Lighthouse pass (perf/a11y) as a smoke check.

## 10. Suggested commits / order of work

1. chore: scaffold Astro, gitignore, scripts, move maintenance page
2. feat: base layout + design tokens + fonts
3. feat: Header and Footer components
4. feat: homepage hero + trust + problem sections
5. feat: opportunity + products + why sections
6. feat: use cases + final CTA
7. docs: update README; add content-map.md
8. chore: responsive polish + a11y pass

## Open questions

- Should interior pages (Blog, Case Studies, About) be stubbed as routes now, or
  left as `#` until content exists? (Plan assumes stubbed placeholders.)
- Tailwind vs. hand-authored CSS — plan assumes hand-authored to match the
  existing `styles.css`. Confirm before scaffolding if a design system is desired.
- Where will this deploy (Netlify / Vercel / S3+CloudFront)? Affects adapter/config.
