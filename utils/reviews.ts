import { API_URL, WEBSITE } from './constants';
import type { review, location } from './types';

interface keyword {
	keyword: string;
}

function unique(array: review[]) {
	return [...new Set(array)];
}

async function getCountyPostcodes(countyId: number) {
	return await fetch(`${API_URL}/locations/county/${countyId}`).then((response) => response.json());
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

// Get all reviews filtered by county, used on the /services/:countySlug pages
export async function getAllReviewsByCounty(countyId: number) {
	// Get all reviews
	const allReviews = await getAllReviews();
	// Get all the postcodes in the county
	const countyPostcodes = await getCountyPostcodes(countyId);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		countyPostcodes.forEach((countyPostcode: location) => {
			// Look for any reviews with the same postcode as any of the locations in the county
			if (review.postcode === countyPostcode.postcode) reviews.push(review);
		});
	});

	return unique(reviews);
}

// Get all reviews filtered by service, used on the /:serviceSlug pages
export async function getAllReviewsByService(serviceId: number) {
	// Get all reviews
	const allReviews = await getAllReviews();
	// Get all keywords for this service
	const keywords = await fetch(`${API_URL}/keywords/service/${serviceId}`).then((response) =>
		response.json()
	);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		keywords.forEach((keyword: keyword) => {
			// Look for any reviews with a title that include the keywords for this service
			if (review.title.includes(keyword.keyword)) reviews.push(review);
		});
	});

	return unique(reviews);
}

// Get all reviews filtered by service and county, used on the /:serviceSlug/:countySlug pages
export async function getAllReviewsByServiceAndCounty(serviceId: number, countyId: number) {
	// Get all reviews
	const allReviews = await getAllReviewsByService(serviceId);
	// Get all the postcodes in the county
	const countyPostcodes = await getCountyPostcodes(countyId);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		countyPostcodes.forEach((countyPostcode: location) => {
			// Look for any reviews with the same postcode as any of the locations in the county
			if (review.postcode === countyPostcode.postcode) reviews.push(review);
		});
	});

	return unique(reviews);
}

// Get all reviews filtered by service and location, used on the /:serviceSlug/:locationSlug pages
export async function getAllReviewsByServiceAndLocation(serviceId: number, postcode: string) {
	// Get all reviews
	const allReviews = await getAllReviewsByService(serviceId);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
		// Look for any reviews with the same postcode as the location
		if (review.postcode === postcode) reviews.push(review);
	});

	return unique(reviews);
}
