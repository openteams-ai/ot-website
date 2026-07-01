// @ts-check
import { defineConfig } from 'astro/config';

// Turn ```mermaid code fences into raw <pre class="mermaid"> so Shiki leaves
// them alone and mermaid.js can render them on the client (see EngineeringPost).
function remarkMermaid() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'code' && child.lang === 'mermaid') {
          const escaped = child.value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          return { type: 'html', value: `<pre class="mermaid">${escaped}</pre>` };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}

// Static site deployed to Cloudflare Pages.
// Build command: `npm run build` — output directory: `dist`.
export default defineConfig({
  site: 'https://openteams.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
