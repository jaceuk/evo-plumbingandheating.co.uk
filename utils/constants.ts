const ENVIRONMENT = 'development';

export const WEBSITE = 'plumbing';

export const API_URL =
	ENVIRONMENT === 'development'
		? 'http://localhost:3000/api'
		: 'https://data.evo-homeservices.co.uk/api';
