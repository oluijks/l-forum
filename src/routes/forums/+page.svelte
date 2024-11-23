<script lang="ts">
	import Board from '$features/forum/Board.svelte';
	import { Icons } from '$lib/components/icons/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<h1>Forums</h1>

<div class="container mx-auto flex flex-col items-center justify-center gap-3">
	<Card.Root class="w-full rounded-lg">
		<Card.Header class="border-b p-3 pl-5">
			<Card.Title level={2} class="font-heading text-xl tracking-wide"
				>L-Forum Support</Card.Title
			>
		</Card.Header>
		<Card.Content class="p-0">
			<Board
				id={1}
				name={'Online Manual'}
				description={'If you need a quick answer'}
				BoardIcon={Icons.manual}
				numberOfPosts={112}
				numberOfTopics={1}
				dateOfLastPost={'March 9, 2024, 10:12:41 PM'}
				subjectOfLastPost={'L-Forum Online Manual'}
				userOfLastPost={'oluijks'}
			/>
			<Board
				id={1}
				name={'News and Updates'}
				description={'Look here to find general news about L-Forum'}
				BoardIcon={Icons.newspaper}
				numberOfPosts={3}
				numberOfTopics={9}
				dateOfLastPost={'November 11, 2024, 12:38:26 PM'}
				subjectOfLastPost={'L-Forum v1.0.0 released'}
				userOfLastPost={'oluijks'}
			/>
			<Board
				id={2}
				name={'Feature Requests'}
				description={'Are you eager for a feature you feel should already be included?'}
				numberOfPosts={128}
				numberOfTopics={16}
				dateOfLastPost={'November 11, 2024, 12:38:26 PM'}
				subjectOfLastPost={'Re: '}
				userOfLastPost={'lubas'}
			/>
			<Board
				id={3}
				name={'Bug Reports'}
				description={'Found a bug? Please report them here...'}
				BoardIcon={Icons.bug}
				numberOfPosts={18}
				numberOfTopics={9}
				dateOfLastPost={'November 11, 2024, 12:38:26 PM'}
				subjectOfLastPost={'Re: Attatchments size can...'}
				userOfLastPost={'alph0nze'}
			/>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-full rounded-lg">
		<Card.Header class="border-b p-3 pl-5">
			<Card.Title level={2} class="font-heading text-xl tracking-wide"
				>Customizing L-Forum</Card.Title
			>
		</Card.Header>
		<Card.Content class="p-0">
			<Board
				id={1}
				name={'Tips and Tricks'}
				description={'If you need a quick answer'}
				BoardIcon={Icons.manual}
				numberOfPosts={112}
				numberOfTopics={1}
				dateOfLastPost={'March 9, 2024, 10:12:41 PM'}
				subjectOfLastPost={'L-Forum Online Manual'}
				userOfLastPost={'oluijks'}
			/>
			<Board
				id={1}
				name={'Graphics and Templates'}
				description={'Graphic and theme or template discussion go in here'}
				numberOfPosts={112}
				numberOfTopics={1}
				dateOfLastPost={'March 9, 2024, 10:12:41 PM'}
				subjectOfLastPost={'L-Forum Online Manual'}
				userOfLastPost={'oluijks'}
			/>
		</Card.Content>
	</Card.Root>

	<Card.Root class="w-full rounded-lg">
		<Card.Header class="border-b p-3 pl-5">
			<Card.Title level={2} class="font-heading text-xl tracking-wide"
				>Archived Boards and Threads...</Card.Title
			>
		</Card.Header>
		<Card.Content class="p-0">
			<Board
				id={1}
				name={'Online Manual'}
				description={'If you need a quick answer'}
				numberOfPosts={0}
				numberOfTopics={0}
				dateOfLastPost={''}
				subjectOfLastPost={''}
				userOfLastPost={''}
			/>
		</Card.Content>
	</Card.Root>
</div>
