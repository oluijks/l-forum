<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import type { Component } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';

	type BoardProps = {
		id: number;
		name: string;
		description: string;
		BoardIcon?: Component<SVGAttributes<SVGElement>, object, ''>;
		dateOfLastPost: string;
		numberOfPosts: number;
		numberOfTopics: number;
		subjectOfLastPost: string;
		userOfLastPost: string;
	};

	let {
		id,
		name,
		description,
		BoardIcon = Icons.default,
		numberOfPosts,
		numberOfTopics,
		dateOfLastPost,
		subjectOfLastPost,
		userOfLastPost
	}: BoardProps = $props();
</script>

<div
	data-testid={id}
	class="board-wrapper group gap-4 rounded-lg border-b p-4 hover:bg-background/80 dark:border-border/60"
>
	<div class="icon">
		<BoardIcon class="size-[38px] text-border group-hover:text-foreground/50" />
	</div>
	<div class="content">
		<h2
			class="font-heading text-xl font-semibold text-orange-600 group-hover:underline group-hover:underline-offset-4"
		>
			{name}
		</h2>
		<p>{description}</p>
	</div>
	{#if numberOfPosts > 0}
		<div class="info">
			<div class="stats">
				<div class="flex gap-1">
					<span class="w-14">Posts:</span>
					<span>{numberOfPosts}</span>
				</div>
				<div class="flex gap-1">
					<span class="w-14">Topics:</span>
					<span>{numberOfTopics}</span>
				</div>
			</div>
			<div class="last-post">
				<p>
					<span class="font-semibold">Last post:</span>
					{dateOfLastPost}
				</p>
				<p>
					<a href="/" class="hover:underline-offset-4">{subjectOfLastPost}</a>
					by
					<a href="/" class="underline underline-offset-4">{userOfLastPost}</a>
				</p>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.board-wrapper {
		display: grid;
		grid-template-columns: auto 1fr 1fr;
		align-items: center;
		width: 100%;
	}

	.icon {
		grid-column: 1;
	}

	.content {
		grid-column: 2;
	}

	.info {
		grid-column: 3;
		display: grid;
		grid-template-columns: 1fr 2fr;
	}

	.stats {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1280px) {
		.board-wrapper {
			grid-template-columns: 1fr;
		}

		.icon {
			display: none;
		}

		.content {
			grid-column: 1;
		}

		.info {
			grid-column: 1;
			grid-template-columns: 1fr;
		}

		.stats {
			flex-direction: row;
			gap: 0.75rem;
		}
	}
</style>
