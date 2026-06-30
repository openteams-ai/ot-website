# OpenTeams Website

A basic static site for OpenTeams. The current homepage displays a temporary
maintenance message.

## Structure

```
.
├── index.html                          # Maintenance landing page
├── styles.css                          # Styles (OpenTeams design tokens)
├── assets/
│   ├── openteams-horizontal.png        # Official logo (mark + wordmark)
│   ├── openteams-white-horizontal.png  # White logo for dark backgrounds
│   └── favicon.svg                     # Pinwheel mark favicon
└── README.md
```

## Run locally

It's pure static HTML/CSS — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Branding

Logos and colors come from the official OpenTeams design system
([`openteams-ai/ai-security`](https://github.com/openteams-ai/ai-security),
`styles/ot-foundations.css`).

- **Logos:** official assets from the `openteams-ai` GitHub org.
- **Palette:** navy `#022791`, blue `#4D75FE`, coral `#FF8A69`, amber `#FAA944`.
- **Type:** Inter Tight (display) + Inter (body), loaded from Google Fonts.

## Notes

- No build step. Only external dependency is the Google Fonts import in
  `styles.css`; remove it to make the page fully offline-capable.
