import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get() {
  const blog = await getCollection('blog');
  return rss({
    title: 'Pigges Blog',
    description: 'My Blog',
    site: 'https://www.pigg.es',
    items: blog.map((post) => ({
      link: `/blog/${post.slug}/`,
      content: (sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
      }).replace('<br/>', '')),
      ...post.data
    })),
    customData: `<language>en-us</language>`,
  });
}