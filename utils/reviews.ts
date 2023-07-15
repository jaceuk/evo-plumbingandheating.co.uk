import { API_URL, WEBSITE } from './constants';
import type { Review, Location } from './types';

interface keyword {
	keyword: string;
}

function unique(array: Review[]) {
	return [...new Set(array)];
}

function arrayWithMatchesFirst(primaryArray: Review[], secondaryArray: Review[]) {
	primaryArray.forEach((primaryItem: Review) => {
		secondaryArray.forEach((secondaryItem: Review, index) => {
			// Remove reviews that were a match
			if (primaryItem.id === secondaryItem.id) secondaryArray.splice(index, 1);
		});
	});

	return [...primaryArray, ...secondaryArray];
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
	const reviews: Review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: Review) => {
		keywords.forEach((keyword: keyword) => {
			// Look for any reviews with a title that include the keywords for services on this site
			if (review.title.includes(keyword.keyword)) reviews.push(review);
		});
	});

	return unique(reviews);
}

// Get all reviews filtered by county, used on the /services/:countySlug pages
async function getReviewsByCounty(countyId: number) {
	// Get all reviews
	const allReviews = await getAllReviews();
	// Get all the postcodes in the county
	const countyPostcodes = await getCountyPostcodes(countyId);
	const reviews: Review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: Review) => {
		countyPostcodes.forEach((countyPostcode: Location) => {
			// Look for any reviews with the same postcode as any of the locations in the county
			if (review.postcode === countyPostcode.postcode) reviews.push(review);
		});
	});

	return unique(reviews);
}

export async function getReviewsByCountyWithBackfill(countyId: number) {
	const reviewsByCounty = await getReviewsByCounty(countyId);
	const allReviews = await getAllReviews();

	// Top up from all reviews
	const reviews = arrayWithMatchesFirst(reviewsByCounty, allReviews);

	return unique(reviews);
}

// Get all reviews filtered by service, used on the /:serviceSlug pages
async function getReviewsByService(serviceId: number) {
	// Get all reviews
	const allReviews = await getAllReviews();
	// Get all keywords for this service
	const keywords = await fetch(`${API_URL}/keywords/service/${serviceId}`).then((response) =>
		response.json()
	);
	const reviews: Review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: Review) => {
		keywords.forEach((keyword: keyword) => {
			// Look for any reviews with a title that include the keywords for this service
			if (review.title.includes(keyword.keyword)) reviews.push(review);
		});
	});

	return unique(reviews);
}

export async function getReviewsByServiceWithBackfill(serviceId: number) {
	const reviewsByService = await getReviewsByService(serviceId);
	const allReviews = await getAllReviews();

	// Top up from all reviews
	const reviews = arrayWithMatchesFirst(reviewsByService, allReviews);

	return unique(reviews);
}

// Get all reviews filtered by service and county, used on the /:serviceSlug/:countySlug pages
async function getReviewsByServiceAndCounty(serviceId: number, countyId: number) {
	// Get all reviews
	const allReviews = await getReviewsByService(serviceId);
	// Get all the postcodes in the county
	const countyPostcodes = await getCountyPostcodes(countyId);
	const reviews: Review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: Review) => {
		countyPostcodes.forEach((countyPostcode: Location) => {
			// Look for any reviews with the same postcode as any of the locations in the county
			if (review.postcode === countyPostcode.postcode) reviews.push(review);
		});
	});

	return unique(reviews);
}

export async function getReviewsByServiceAndCountyWithBackfill(
	serviceId: number,
	countyId: number
) {
	const reviewsByServiceAndCounty = await getReviewsByServiceAndCounty(serviceId, countyId);
	const reviewsByService = await getReviewsByService(serviceId);
	const allReviews = await getAllReviews();

	// top up from reviews by service
	const serviceReviews = arrayWithMatchesFirst(reviewsByServiceAndCounty, reviewsByService);

	// top up from ALL reviews
	const reviews = arrayWithMatchesFirst(serviceReviews, allReviews);

	return unique(reviews);
}

// Get all reviews filtered by service and location, used on the /:serviceSlug/:locationSlug pages
async function getReviewsByServiceAndLocation(serviceId: number, postcode: string) {
	// Get all reviews
	const allReviews = await getReviewsByService(serviceId);
	const reviews: Review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: Review) => {
		// Look for any reviews with the same postcode as the location
		if (review.postcode === postcode) reviews.push(review);
	});

	return unique(reviews);
}

export async function getReviewsByServiceAndLocationWithBackfill(
	serviceId: number,
	postcode: string,
	countyId: number
) {
	const reviewsByServiceAndLocation = await getReviewsByServiceAndLocation(serviceId, postcode);
	const reviewsByServiceAndCounty = await getReviewsByServiceAndCounty(serviceId, countyId);
	const reviewsByService = await getReviewsByService(serviceId);
	const allReviews = await getAllReviews();

	// top up from reviews by service and county
	const serviceAndCountyReviews = arrayWithMatchesFirst(
		reviewsByServiceAndLocation,
		reviewsByServiceAndCounty
	);

	// top up from reviews by service
	const serviceReviews = arrayWithMatchesFirst(serviceAndCountyReviews, reviewsByService);

	// top up from ALL reviews
	const reviews = arrayWithMatchesFirst(serviceReviews, allReviews);

	return unique(reviews);
}
