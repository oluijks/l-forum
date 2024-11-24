import { z } from 'zod';

export const loginFormSchema = z.object({
	username: z.string(),
	password: z.string()
});

export const registerFormSchema = z
	.object({
		username: z.string().min(1, { message: 'Username is required' }),
		password: z
			.string()
			.min(8, { message: 'Password must contain at least 8 character(s)' }),
		passwordConfirm: z.string()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['passwordConfirm']
			});
		}
	});

export type LoginFormSchema = typeof loginFormSchema;
export type RegisterFormSchema = typeof registerFormSchema;
