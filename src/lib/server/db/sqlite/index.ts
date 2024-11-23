import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema.js';

if (!env.TURSO_CONNECTION_URL)
	throw new Error('TURSO_CONNECTION_URL is not set');
if (!dev && !env.TURSO_AUTH_TOKEN)
	throw new Error('DATABASE_AUTH_TOKEN is not set');

export const db = drizzle({
	connection: {
		url: env.TURSO_CONNECTION_URL,
		authToken: env.TURSO_AUTH_TOKEN
	},

	schema,
	casing: 'snake_case',
	logger: dev
});
