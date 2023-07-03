export interface review {
	id: number;
	title: string;
	text: string;
	date: string;
	postcode: string;
}

export interface location {
	id: number;
	county: number | null;
	name: string;
	slug: string;
	postcode: string | null;
	tel: string | null;
	info: string | null;
}
