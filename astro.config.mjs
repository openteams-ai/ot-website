// @ts-check
import { defineConfig } from 'astro/config';

// Static site deployed to Cloudflare Pages.
// Build command: `npm run build` — output directory: `dist`.
export default defineConfig({
  site: 'https://openteams.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
