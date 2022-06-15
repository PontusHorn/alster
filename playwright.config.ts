import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000
	},
	// Only run Playwright on files that end in .spec.ts (avoids conflicting with vitest)
	testMatch: 'tests/*.spec.ts'
};

export default config;
