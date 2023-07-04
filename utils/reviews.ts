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
async function getReviewsByCounty(countyId: number) {
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

export async function getReviewsByCountyWithBackfill(countyId: number) {
	const reviewsByCounty = await getReviewsByCounty(countyId);
	const allReviews = await getAllReviews();

	// Top up from all reviews
	reviewsByCounty.forEach((reviewByCounty: review, index) => {
		allReviews.forEach((review: review) => {
			// Remove reviews that were a match
			if (review.id === reviewByCounty.id) allReviews.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const reviews = [...reviewsByCounty, ...allReviews];

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

export async function getReviewsByServiceWithBackfill(serviceId: number) {
	const reviewsByService = await getReviewsByService(serviceId);
	const allReviews = await getAllReviews();

	// Top up from all reviews
	reviewsByService.forEach((reviewByService: review) => {
		allReviews.forEach((review: review, index) => {
			// Remove reviews that were a match
			if (review.id === reviewByService.id) allReviews.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const reviews = [...reviewsByService, ...allReviews];

	return unique(reviews);
}

// Get all reviews filtered by service and county, used on the /:serviceSlug/:countySlug pages
async function getReviewsByServiceAndCounty(serviceId: number, countyId: number) {
	// Get all reviews
	const allReviews = await getReviewsByService(serviceId);
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

export async function getReviewsByServiceAndCountyWithBackfill(
	serviceId: number,
	countyId: number
) {
	const reviewsByServiceAndCounty = await getReviewsByServiceAndCounty(serviceId, countyId);
	const reviewsByService = await getReviewsByService(serviceId);
	const allReviews = await getAllReviews();

	// top up from reviews by service
	reviewsByServiceAndCounty.forEach((reviewByServiceAndCounty: review) => {
		reviewsByService.forEach((reviewByService: review, index) => {
			// Remove reviews that were a match
			if (reviewByService.id === reviewByServiceAndCounty.id) reviewsByService.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const serviceReviews = [...reviewsByServiceAndCounty, ...reviewsByService];

	// top up from ALL reviews
	serviceReviews.forEach((serviceReview: review) => {
		allReviews.forEach((review: review, index) => {
			// Remove reviews that were a match
			if (serviceReview.id === review.id) allReviews.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const reviews = [...serviceReviews, ...allReviews];

	return unique(reviews);
}

// Get all reviews filtered by service and location, used on the /:serviceSlug/:locationSlug pages
async function getReviewsByServiceAndLocation(serviceId: number, postcode: string) {
	// Get all reviews
	const allReviews = await getReviewsByService(serviceId);
	const reviews: review[] = [];

	// Iterate over all the reviews
	allReviews.forEach((review: review) => {
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

	// top up from reviews by service and county if needed
	reviewsByServiceAndLocation.forEach((reviewByServiceAndLocation: review) => {
		reviewsByServiceAndCounty.forEach((reviewByServiceAndCounty: review, index) => {
			// Remove reviews that were a match
			if (reviewByServiceAndLocation.id === reviewByServiceAndCounty.id)
				reviewsByServiceAndCounty.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const serviceAndCountyReviews = [...reviewsByServiceAndLocation, ...reviewsByServiceAndCounty];

	// top up from reviews by service
	serviceAndCountyReviews.forEach((serviceAndCountyReview: review) => {
		reviewsByService.forEach((reviewByService: review, index) => {
			// Remove reviews that were a match
			if (reviewByService.id === serviceAndCountyReview.id) reviewsByService.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const serviceReviews = [...serviceAndCountyReviews, ...reviewsByService];

	// top up from ALL reviews
	serviceReviews.forEach((serviceReview: review) => {
		allReviews.forEach((review: review, index) => {
			// Remove reviews that were a match
			if (serviceReview.id === review.id) allReviews.splice(index, 1);
		});
	});

	// add the reviews that weren't a match to the end of the ones that were
	const reviews = [...serviceReviews, ...allReviews];

	return unique(reviews);
}
