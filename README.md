# OpenTeams Website

The OpenTeams marketing site, built with [Astro](https://astro.build). Static
output, hand-authored CSS, zero client framework.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # → dist/
npm run preview    # serve the production build locally
```

## Deploy — Cloudflare Pages

Deployed to **Cloudflare Pages** (already connected).

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20+ (see `.nvmrc` / Pages env `NODE_VERSION`)

`output: 'static'` in `astro.config.mjs`, so no adapter is required.

## Structure

```
src/
├── layouts/BaseLayout.astro     # <head>, header, footer, slot
├── components/
│   ├── Header.astro             # sticky nav + dropdowns (mobile menu)
│   ├── Footer.astro             # columns, socials, newsletter, legal
│   └── PageHero.astro           # reusable dark hero for interior pages
├── pages/                       # one dir per route (directory URLs)
│   ├── index.astro              # homepage
│   ├── maintenance.astro        # standalone maintenance page (noindex)
│   └── <slug>/index.astro       # interior pages
└── styles/global.css            # design tokens + utility classes
public/assets/                   # logos + favicon
```

## Branding

Palette & type from the OpenTeams design system (`ot-foundations.css`):

- **Colors:** navy `#022791`, blue `#4D75FE`, coral `#FF8A69`, amber `#FAA944`.
- **Type:** Inter Tight (display) + Inter (body) + JetBrains Mono (accents), via Google Fonts.
- **Logos:** official assets in `public/assets/`.

## Content provenance

Homepage and interior content were reconstructed from the Wayback Machine
snapshot of `openteams.com` (June 2026) while the live site was down. A few
pages had no snapshot (`capabilities`, `python-security-remediation`,
`owned-intelligence-assessment`) and were written to match the site's messaging.
