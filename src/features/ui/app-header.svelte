<script lang="ts">
	import { page } from '$app/stores';

	import { cn } from '$lib/utils.js';
	import ThemeSwitcher from './theme-switcher.svelte';
	import type { ScrollDirection } from '$lib/types.js';

	// Logic scroll behavior, thanks to Johnny Magrippis (https://www.youtube.com/@jmagrippis)
	let previousY = 0;
	let currentY = $state<number>(0);
	let clientHeight = $state<number>(0);
	const derivedDirection = (y: number): ScrollDirection => {
		const direction = !previousY || previousY < y ? 'down' : 'up';
		previousY = y;

		return direction;
	};
	const scrollDirection = $derived(derivedDirection(currentY));
	const offScreen = $derived(
		scrollDirection === 'down' && currentY > clientHeight * 4
	);
</script>

<svelte:window bind:scrollY={currentY} />

<!-- <pre>{JSON.stringify($page.data.user, null, 2)}</pre> -->

<header
	class:motion-safe:-translate-y-full={offScreen}
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	bind:clientHeight
>
	<div class="flex h-14 items-center">
		<div class="flex">
			<nav class="flex items-center gap-6">
				<a
					href="/"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname === '/'
							? 'text-foreground'
							: 'text-foreground/70'
					)}
				>
					home
				</a>
				<a
					href="/about"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname === '/about'
							? 'text-foreground'
							: 'text-foreground/70'
					)}
				>
					about
				</a>
				{#if $page.data.user}
					<a
						href="/forum"
						class={cn(
							'transition-colors hover:text-foreground/80',
							$page.url.pathname.startsWith('/forum')
								? 'text-foreground'
								: 'text-foreground/70'
						)}
					>
						forum
					</a>
				{/if}
			</nav>
		</div>
		<div class="ml-auto">
			<ThemeSwitcher />
		</div>
	</div>
</header>
