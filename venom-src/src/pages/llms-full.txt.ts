import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const sections = posts.map(post => {
    const date = post.data.publishDate.toISOString().split('T')[0];
    return `# ${post.data.title}\n\n` +
      `> ${post.data.description}\n\n` +
      `Published: ${date} | Author: ${post.data.author}\n` +
      `URL: https://semiautonomous.systems/blog/${post.slug}/\n\n` +
      `${post.body}`;
  });

  const body = `# Semiautonomous Systems - Full Blog Content\n\n` +
    `> All published blog posts from Semiautonomous Systems, concatenated for LLM consumption.\n\n` +
    `Generated: ${new Date().toISOString().split('T')[0]}\n` +
    `Total posts: ${posts.length}\n\n---\n\n` +
    sections.join('\n\n---\n\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
