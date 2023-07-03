export function getServiceReviews(reviews, serviceSlug) {
	const keywords = [];

	if (serviceSlug === 'plumbing')
		keywords.push('leak', 'tap', 'shower', 'bath', 'pump', 'overflow', 'water', 'sink', 'water');
	if (serviceSlug === 'blocked-sink-drains') keywords.push('block', 'sink', 'basin', 'toilet');
	if (serviceSlug === 'central-heating') keywords.push('heating', 'radiator');
	if (serviceSlug === 'power-flushing') keywords.push('power', 'flush');
	if (serviceSlug === 'boiler-servicing-repairs') keywords.push('boiler');
	if (serviceSlug === 'gutter-cleaning') keywords.push('gutter');
	if (serviceSlug === 'patio-cleaning') keywords.push('patio');
	if (serviceSlug === 'roof-cleaning') keywords.push('roof');

	let filteredReviews = [];
	reviews.forEach((review) => {
		const title = review.title.toLowerCase();

		keywords.forEach((keyword) => {
			if (title.includes(keyword)) {
				filteredReviews.push(review);
			}
		});
	});

	// remove duplicates
	return unique(filteredReviews);
}

export function getLatestReviews(reviews, limit) {
	unique(reviews).sort((a, b) => new Date(b.date) - new Date(a.date));
	return reviews.slice(0, limit);
}

export function unique(array) {
	return [...new Set(array)];
}
