<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import TailwindBreakPointIndicator from '$features/tailwindcss/tailwind-indicator.svelte';

	import AppFooter from '$features/ui/app-footer.svelte';
	import AppHeader from '$features/ui/app-header.svelte';

	let {
		children,
		data
	}: {
		children: Snippet;
		data: LayoutServerData;
	} = $props();

	const title = $derived($page.data.meta?.title ?? data.defaultMeta.title);
	const description = $derived(
		$page.data.meta?.description ?? data.defaultMeta.description
	);
</script>

<svelte:head>
	<title>{title} :: L-Forum</title>
	<meta name="description" content={description} />
</svelte:head>

<Toaster richColors />
<ModeWatcher defaultMode={'system'} />

<div id="app">
	<AppHeader />
	<main>
		{@render children?.()}
	</main>
	<AppFooter />
</div>
<TailwindBreakPointIndicator />
