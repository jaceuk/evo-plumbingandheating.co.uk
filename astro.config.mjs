import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	build: {
		// Example: Generate `page.html` instead of `page/index.html` during build.
		format: 'file'
	},
	site: 'https://www.evo-plumbingandheating.co.uk/',
	server: {
		port: 3001,
		host: true
	},
	integrations: [
		sitemap(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp'
		}),
		react()
	]
});
