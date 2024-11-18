import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db/sqlite';
import { PASSWORD_HASH_OPTIONS } from '$lib/utils';
import * as table from '$lib/server/db/sqlite/schema';
import { registerFormSchema } from '$features/auth/form-schemas.js';

import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { zod } from 'sveltekit-superforms/adapters';
import { generateRandomString } from '@oslojs/crypto/random';
import { message, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = (async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		meta: {
			title: 'Register'
		},
		form: await superValidate(zod(registerFormSchema), { strict: false })
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		if (!form.valid) {
			return message(form, { status: 'error', text: 'Invalid form' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(form.data.password, PASSWORD_HASH_OPTIONS);

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, form.data.username));

		const existingUser = results.at(0);
		if (existingUser) {
			return message(form, { status: 'error', text: 'Username already taken' });
		}

		try {
			await db.insert(table.user).values({
				id: userId,
				username: form.data.username,
				passwordHash: passwordHash
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return message(form, {
				status: 'error',
				text: 'Error, please try again'
			});
		}

		redirect(303, '/');
	}
};

const alphabet =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

function generateUserId(length = 21): string {
	return generateRandomString(
		{ read: (bytes) => crypto.getRandomValues(bytes) },
		alphabet,
		length
	);
}
