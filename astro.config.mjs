import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import htmlMinifier from "astro-html-minifier";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pigg.es',
  integrations: [mdx(), sitemap(), robotsTxt({}), htmlMinifier()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      content: {
        type: 'text',
        value: ' 🔗',
        rel: ['noreferrer'],
        target: '_blank'
      }
    }]]
  }
});