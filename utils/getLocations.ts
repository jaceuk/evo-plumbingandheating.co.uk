export interface location {
	id: number;
	county: number;
	name: string;
	slug: string;
	postcode: string;
	tel: string;
	info: string;
}

interface county {
	id: number;
	name: string;
	slug: string;
}

export async function getLocations() {
	const locations = await fetch('http://localhost:3000/api/locations').then((response) =>
		response.json()
	);

	const counties = await fetch('http://localhost:3000/api/counties').then((response) =>
		response.json()
	);

	// add each county as a location
	counties.forEach((county: county) => {
		locations.push({
			id: null,
			county: null,
			name: county.name,
			slug: county.slug,
			postcode: null,
			tel: null,
			info: null
		});
	});

	return locations.map((location: location) => {
		return {
			params: { locationSlug: location.slug },
			props: { location }
		};
	});
}

export async function getLocationsInSameCounty(countyId: number) {
	return await fetch(`http://localhost:3000/api/locations/county/${countyId}`).then((response) =>
		response.json()
	);
}
