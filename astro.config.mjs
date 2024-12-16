import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import AutoImport from 'astro-auto-import';
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pigg.es',
  prefetch: true,
  image: {
    domains: ["images.credly.com"],
  },
  integrations: [AutoImport({
    imports: [mdxCodeBlockAutoImport('./src/components/CodeBlock.astro')]
  }), MDXCodeBlocks(), mdx(), sitemap(), robotsTxt({})],
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