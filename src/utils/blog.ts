import type { CollectionEntry } from 'astro:content';

export function sortByDateDesc(blogPosts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
	const sortedPosts = blogPosts.sort(function (
		a: CollectionEntry<'blog'>,
		b: CollectionEntry<'blog'>
	) {
		var keyA = new Date(a.data.date),
			keyB = new Date(b.data.date);
		// Compare the 2 dates
		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	});

	return sortedPosts;
}

export function getMarkdownExcerpt(content: string, maxExcerptLength = 150) {
	// Trim and normalize whitespace in content text
	content = content.trim().replace(/\s+/g, ' ');
	const excerpt = content.slice(0, maxExcerptLength);

	if (content.length > maxExcerptLength) {
		return excerpt + '...';
	}

	return excerpt;
}
