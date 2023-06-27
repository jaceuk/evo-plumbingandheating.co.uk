import fs from 'fs';
import { getServiceReviews, getLatestReviews, unique } from './utils.js';

let servicesJson;
let placesJson;
let reviewsJson;

try {
  // reading a JSON file synchronously
  servicesJson = fs.readFileSync('services.json');
  placesJson = fs.readFileSync('places.json');
  reviewsJson = fs.readFileSync('reviews.json');
} catch (error) {
  console.error(error);
  throw error;
}

// parsing the JSON content
const services = JSON.parse(servicesJson);
const places = JSON.parse(placesJson);
const reviews = JSON.parse(reviewsJson);

/*
build seperate data file for each service populated with places and reviews
*/

services.forEach((service) => {
  // populate template number
  places.forEach((place, index) => {
    // services have 2 templates by default
    if (service.templates === 2) {
      if (index % 2 === 0) return (place.template = 2);
      place.template = 1;
    }

    // power flushing has 9 templates so needs an exception
    if (service.templates === 9) {
      if (index % 9 === 1) return (place.template = 2);
      if (index % 9 === 2) return (place.template = 3);
      if (index % 9 === 3) return (place.template = 4);
      if (index % 9 === 4) return (place.template = 5);
      if (index % 9 === 5) return (place.template = 6);
      if (index % 9 === 6) return (place.template = 7);
      if (index % 9 === 7) return (place.template = 8);
      if (index % 9 === 8) return (place.template = 9);
      place.template = 1;
    }
  });

  // filter reviews by service slug
  const serviceReviews = getServiceReviews(reviews, service.slug);

  // add filtered reviews to the correct places based on postcode
  places.forEach((place) => {
    place.reviews = [];

    serviceReviews.forEach((review) => {
      if (review.postcode === place.postcode) {
        place.reviews.push(review);
      }
    });

    // if place is a county we need to grab all reviews from the places in the county
    // we can identify counties as they can't belong to other counties
    if (place.county === null) {
      const county = place.slug;
      let countyReviews = [];

      places.forEach((place) => {
        if (place.county === county) {
          // ignore places with no reviews
          countyReviews = [...countyReviews, ...place.reviews];
        }
      });

      const countyReviewsNoDuplicates = unique(countyReviews);

      if (countyReviews.length === 0) {
        place.reviews = [];
      } else {
        place.reviews = [...countyReviewsNoDuplicates, ...place.reviews];
      }
    }

    const latestTwelveReviews = getLatestReviews(serviceReviews, 12);

    place.reviews = latestTwelveReviews;
  });

  const dataJson = JSON.stringify(places);

  fs.writeFile(`../_data/${service.slug}-places.json`, dataJson, (error) => {
    if (error) {
      console.error(error);
      throw error;
    }
  });

  console.log(`${service.slug}-places.json written correctly`);
});

/*
build latest reviews file
*/

let latestReviews = [];

// just get the latest 12 reviews for the homepage
const latestTwelveReviewsAllServices = getLatestReviews(reviews, 12);
latestReviews.push({ service: null, reviews: latestTwelveReviewsAllServices });

services.forEach((service) => {
  const serviceReviews = getServiceReviews(reviews, service.slug);
  let latestReviewsForService = getLatestReviews(serviceReviews, 12);
  const reviewCount = latestReviewsForService.length;
  let additionalReviews;

  // if there aren't 12 reviews for a service then fill up with the latest reviews
  if (reviewCount < 12) {
    additionalReviews = latestTwelveReviewsAllServices.slice(0, 12 - reviewCount);
    latestReviewsForService = [...latestReviewsForService, ...additionalReviews];
  }

  latestReviews.push({ service: service.slug, reviews: latestReviewsForService });
});

const dataJson = JSON.stringify(latestReviews);

fs.writeFile(`../_data/latest-reviews.json`, dataJson, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
});

console.log(`latest-reviews.json written correctly`);
