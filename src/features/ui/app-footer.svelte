<script lang="ts">
	import { page } from '$app/stores';
	import { version } from '$app/environment';

	import type { NavItem } from '$lib/types.js';

	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';

	import { VERSION as svelteVersion } from 'svelte/compiler';
	import { VERSION as svelteKitVersion } from '@sveltejs/kit';

	export const footerNavItems: NavItem[] = [
		{ title: 'about', href: '/about' },
		{ title: 'cookies', href: '/legal/cookies' },
		{ title: 'policy', href: '/legal/policy' },
		{ title: 'terms', href: '/legal/terms' }
	];
</script>

<footer>
	<div class="footer-container">
		<div>
			{#each footerNavItems as footerNavItem}
				{@const isActive = $page.url.pathname === footerNavItem.href}
				<Button
					variant="link"
					href={footerNavItem.href}
					aria-current={isActive ? 'page' : undefined}
					class={cn(
						'transition-colors hover:text-foreground/80',
						isActive ? 'text-foreground' : 'text-foreground/70'
					)}>{footerNavItem.title}</Button
				>
			{/each}
		</div>
		<p
			class="flex items-center gap-1 text-sm text-muted-foreground/75 2xl:mr-8"
		>
			L-Forum v{version}
		</p>
		<p class="text-sm text-muted-foreground/75 2xl:mr-8">
			Svelte v{svelteVersion} and SvelteKit v{svelteKitVersion}
		</p>
	</div>
</footer>

<style lang="postcss">
	footer {
		@apply mt-auto border-t border-border/40 bg-background p-2;
	}
	.footer-container {
		@apply flex flex-col items-center gap-2 p-2;
	}
</style>
