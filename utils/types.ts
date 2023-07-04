export interface review {
	id: number;
	title: string;
	text: string;
	date: string;
	postcode: string;
}

export interface location {
	id: number;
	county: number;
	name: string;
	slug: string;
	postcode: string;
	tel: string | null;
	info: string | null;
}

export interface service {
	id: number;
	name: string;
	slug: string;
	templates: number;
	website: string;
}
