<script lang="ts">
	import type { PageData } from './$types';

	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<h1>Welcome to L-Forum</h1>

{#if data.user}
	<form method="post" action="?/logout" use:enhance>
		<Button variant="default" size={'sm'} type="submit">Logout</Button>
	</form>
{/if}
