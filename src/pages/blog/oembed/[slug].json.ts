import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export async function GET({ props, site }) {
  const { entry } = props;
  const siteUrl = site;

  const isRemoteImage = entry.data.image && typeof entry.data.image === 'string' && entry.data.image.startsWith('http');
  const imageUrl = isRemoteImage ? entry.data.image : entry.data.image ? siteUrl + entry.data.image : undefined;

  const oembed = {
    type: 'rich',
    url: `${siteUrl}/blog/${entry.id}`,
    title: entry.data.title,
    author_name: 'Philip Ahlqvist',
    author_url: `${siteUrl}/about`,
    provider_name: 'Pigg.es',
    provider_url: siteUrl,
    html: `<a href="${siteUrl}/blog/${entry.id}">${entry.data.title}</a>`,
    ...(imageUrl && { thumbnail_url: imageUrl, thumbnail_width: 1200, thumbnail_height: 630 }),
    ...(entry.data.description && { summary: entry.data.description }),
  };

  return new Response(JSON.stringify(oembed), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
