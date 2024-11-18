import adapter from '@sveltejs/adapter-auto';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as child_process from 'node:child_process';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// @see https://svelte.dev/docs/kit/integrations
	preprocess: vitePreprocess(),

	kit: {
		// @see https://svelte.dev/docs/kit/adapters
		// @see https://svelte.dev/docs/kit/adapter-auto
		version: {
			name: `${pkg.version} (rev ${child_process.execSync('git rev-parse --short HEAD').toString().trim()})`,
			pollInterval: 3000
		},
		adapter: adapter(),
		alias: {
			$features: './src/features'
		}
	}
};

export default config;
