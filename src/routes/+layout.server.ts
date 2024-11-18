import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	return {
		defaultMeta: {
			title: 'home',
			description: 'default meta descriptions'
		},
		user: event.locals.user,
		session: event.locals.session
	};
};
