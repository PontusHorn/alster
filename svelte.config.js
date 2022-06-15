import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		vite: {
			test: {
				// Only run vitest on files that end in .test.ts (avoids conflicting with Playwright)
				include: ['**/*.test.ts']
			}
		}
	}
};

export default config;
