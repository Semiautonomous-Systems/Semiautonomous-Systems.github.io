import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  const lines = posts.map(post => {
    const date = post.data.publishDate.toISOString().split('T')[0];
    return `- [${post.data.title}](https://semiautonomous.systems/blog/${post.slug}/) (${date}): ${post.data.description}`;
  });

  const body =
    `# Semiautonomous Systems\n\n` +
    `> Research and analysis on AI training data enforcement, defensive data poisoning, AI crawler compliance measurement, and the technical and legal infrastructure publishers use to govern unauthorized AI training.\n\n` +
    `## Blog posts\n\n` +
    lines.join('\n') + '\n\n' +
    `## Reference\n\n` +
    `- [About / VENOM](https://semiautonomous.systems/venom/): The VENOM enforcement product and operating principle.\n` +
    `- [Full content](https://semiautonomous.systems/llms-full.txt): Concatenated full text of all blog posts for LLM ingestion.\n` +
    `- [RSS feed](https://semiautonomous.systems/rss.xml): Standard RSS feed.\n` +
    `- [Sitemap](https://semiautonomous.systems/sitemap-index.xml): XML sitemap.\n\n` +
    `## Optional\n\n` +
    `- Author: Semiautonomous Systems. Contact: venom@semiautonomous.systems.\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
