import type { SvelteComponent } from 'svelte';

import Manual from './book-text.svelte';
import Newspaper from './newspaper.svelte';
import MessagesSquare from './messages-square.svelte';
import Bug from './bug.svelte';

export type Icon = SvelteComponent;

export const Icons = {
	default: MessagesSquare,
	bug: Bug,
	messages: MessagesSquare,
	manual: Manual,
	newspaper: Newspaper
};
