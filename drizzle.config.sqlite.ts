import { defineConfig } from 'drizzle-kit';

if (!process.env.TURSO_CONNECTION_URL)
	throw new Error('TURSO_CONNECTION_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/sqlite/schema.ts',
	out: './src/lib/server/db/sqlite/migrations',

	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL,
		authToken: process.env.TURSO_AUTH_TOKEN
	},

	verbose: true,
	strict: true,
	dialect: 'turso',
	casing: 'snake_case'
});
