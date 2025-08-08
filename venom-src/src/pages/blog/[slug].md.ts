import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection>>[number] };
  const date = post.data.publishDate.toISOString().split('T')[0];

  const body = `# ${post.data.title}\n\n` +
    `> ${post.data.description}\n\n` +
    `Published: ${date} | Author: ${post.data.author}\n` +
    `URL: https://semiautonomous.systems/blog/${post.slug}/\n` +
    `Keywords: ${post.data.keywords.join(', ')}\n\n---\n\n` +
    `${post.body}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
