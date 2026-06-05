import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Single source of truth for "what is published."
 *
 * A post is public when it is not a draft and its publishDate is at or before
 * build time. Results are sorted newest first. Every surface that enumerates
 * posts (blog index, RSS, llms.txt, llms-full.txt, per-post pages, and thereby
 * the sitemap) MUST go through this so they cannot drift out of sync.
 *
 * The cutoff is evaluated at build time, so the daily rebuild cron in
 * .github/workflows/pages.yml is what reveals scheduled posts on their date.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const now = Date.now();
  return (await getCollection('blog'))
    .filter(({ data }) => !data.draft && data.publishDate.valueOf() <= now)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
