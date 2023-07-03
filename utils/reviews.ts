import { API_URL, WEBSITE } from './constants';
import type { review, location } from './types';

interface keyword {
	keyword: string;
}

function unique(array: review[]) {
	return [...new Set(array)];
}

// Get all reviews, used on the homepage and as the starting point for all other pages
export async function getAllReviews() {
	// Get all reviews
	const allReviews = await fetch(`${API_URL}/reviews`).then((response) => response.json());
	// Get all keywords for services that are on this wite
	const keywords = await fetch(`${API_URL}/keywords/website/${WEBSITE}`).then((response) =>
		response.json()
	);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		keywords.forEach((keyword: keyword) => {
			// Look for any reviews with a title that include the keywords for services on this site
			if (review.title.includes(keyword.keyword)) reviews.push(review);
		});
	});

	return unique(reviews);
}

// Get all reviews filtered by county, used on the /services/:countyId pages
export async function getAllReviewsByCounty(countyId: number) {
	// Get all reviews
	const allReviews = await getAllReviews();
	// Get all the locations in the county
	const locationsInSameCounty = await fetch(`${API_URL}/locations/county/${countyId}`).then(
		(response) => response.json()
	);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		locationsInSameCounty.forEach((locationInSameCounty: location) => {
			// Look for any reviews with the same postcode as any of the locations in the county
			if (review.postcode === locationInSameCounty.postcode) reviews.push(review);
		});
	});

	return unique(reviews);
}

export async function getAllByService() {}

export async function getAllByServiceByCounty() {}

export async function getAllByServiceByLocation() {}
