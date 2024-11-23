import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema.js';

if (!env.VERCEL_TURSO_CONNECTION_URL)
	throw new Error('VERCEL_TURSO_CONNECTION_URL is not set');
if (!dev && !env.VERCEL_TURSO_AUTH_TOKEN)
	throw new Error('VERCEL_TURSO_AUTH_TOKEN is not set');

export const db = drizzle({
	connection: {
		url: env.VERCEL_TURSO_CONNECTION_URL,
		authToken: env.VERCEL_TURSO_AUTH_TOKEN
	},

	schema,
	casing: 'snake_case',
	logger: dev
});
