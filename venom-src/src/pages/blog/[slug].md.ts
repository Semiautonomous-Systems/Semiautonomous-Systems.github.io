import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPublishedPosts } from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
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
