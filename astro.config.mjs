import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import AutoImport from 'astro-auto-import';
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';

function rehypeStripStyleAttribute() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.properties) {
        delete node.properties.style;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pigg.es',
  prefetch: true,
  image: {
    domains: ["images.credly.com"],
  },
  server: {
    allowedHosts: ["dev.pigg.es"]
  },
  integrations: [AutoImport({
    imports: [mdxCodeBlockAutoImport('./src/components/CodeBlock.astro')]
  }), MDXCodeBlocks(), mdx(), sitemap(), robotsTxt({})],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeExternalLinks, {
        content: {
          type: 'text',
          value: ' 🔗',
          rel: ['noreferrer'],
          target: '_blank'
        }
      }],
      rehypeStripStyleAttribute
    ]
  }
});