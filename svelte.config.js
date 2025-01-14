import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Behalte dein Preprocessing bei
	preprocess: vitePreprocess(),

	kit: {
		// Verwende den Static Adapter
		adapter: adapter({
			// Fallback für SPA-Routing
			fallback: 'index.html',
		}),
		paths: {
			// Passe den Base-Pfad an dein GitHub-Repository an
			base: '/neelo-prototype',
		},
		// Entferne "prerender.default" und konfiguriere Prerendering separat
		prerender: {
			entries: ['*'], // Rendere alle Seiten standardmäßig
		},
	},
};

export default config;
