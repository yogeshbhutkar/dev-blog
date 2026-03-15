import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/content/blogs" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			coverImage: z.union([image(), z.url()]),
			tags: z.array(z.string()),
			author: z.string(),
			avatar: image(),
			featured: z.boolean().default(false),
			excerpt: z.string().optional(),
			publishedDate: z.date().transform((date) =>
				date.toLocaleDateString(undefined, {
					year: "numeric",
					month: "short",
					day: "numeric",
				}),
			),
		}),
});

export const collections = {
	blogs: postsCollection,
};
