import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

export async function GET() {
    const blog = await getCollection('blog');
    
    const items = blog.map((post) => {
        const content = sanitizeHtml(parser.render(post.body), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['class', 'id'],
                'img': ['src', 'alt', 'title'],
                'a': ['href', 'title'],
            }
        });

        return {
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.id}/`,
            content: content,
            categories: post.data.tags || [],
        };
    });

    return rss({
        title: 'Pigges Blog',
        description: 'My Blog - Thoughts on Linux, development, and more.',
        site: 'https://www.pigg.es',
        items: items,
        customData: `<language>en-us</language>`,
    });
}
