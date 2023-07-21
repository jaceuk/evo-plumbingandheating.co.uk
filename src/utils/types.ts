export interface Review {
	id: number;
	title: string;
	text: string;
	date: string;
	postcode: string;
}

export interface Location {
	id: number;
	county: number;
	name: string;
	slug: string;
	postcode: string;
	tel: string | null;
	info: string | null;
}

export interface Service {
	id: number;
	name: string;
	slug: string;
	templates: number;
	website: string;
}
