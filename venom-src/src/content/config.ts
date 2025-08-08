import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    author: z.string().default('Semiautonomous Systems'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
