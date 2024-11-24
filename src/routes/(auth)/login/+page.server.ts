import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db/sqlite';
import { PASSWORD_HASH_OPTIONS } from '$lib/utils';
import * as table from '$lib/server/db/sqlite/schema';
import { loginFormSchema } from '$features/auth/form-schemas.js';

import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = (async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		meta: {
			title: 'Login'
		},
		form: await superValidate(zod(loginFormSchema), { strict: false })
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return message(form, { status: 'error', text: 'Invalid form' });
		}

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, form.data.username));
		const existingUser = results.at(0);
		if (!existingUser) {
			return message(form, { status: 'error', text: 'Invalid credentials' });
		}

		const validPassword = await verify(
			existingUser.passwordHash,
			form.data.password,
			PASSWORD_HASH_OPTIONS
		);
		if (!validPassword) {
			return message(form, { status: 'error', text: 'Invalid credentials' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		const redirectTo = event.url.searchParams.get('redirectTo');
		if (redirectTo) return redirect(303, `/${redirectTo.slice(1)}`);
		return redirect(303, '/');
	}
};
