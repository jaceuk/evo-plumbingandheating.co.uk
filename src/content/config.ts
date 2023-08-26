import { z, defineCollection } from 'astro:content';

const SERVICES = [
	'plumbing',
	'blocked-sinks-toilets',
	'central-heating',
	'boiler-servicing-repairs',
	'power-flushing',
	'gutter-cleaning',
	'patio-cleaning',
	'roof-cleaning',
	''
] as const;

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.string(),
		service: z.enum(SERVICES)
	})
});

export const collections = {
	blog: blogCollection
};
