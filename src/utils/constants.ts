export const WEBSITE = 'plumbing';

export const API_URL =
	import.meta.env.PUBLIC_ENVIRONMENT === 'development'
		? 'http://localhost:3000/api'
		: 'https://api.evo-homeservices.co.uk/api';

export const RECAPTCHA_SITE_KEY = '6LcLQ9sUAAAAANQermDnySq_6PvjBm1piE43kUUA';

export const FREEPHONE_NUMBER = '0800 920 2030';
