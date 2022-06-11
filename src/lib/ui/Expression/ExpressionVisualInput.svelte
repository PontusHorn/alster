<script lang="ts">
	import type { Expression } from '$lib/types';
	import { Operator, Ref, Value } from '$lib/ui/Expression';
	import Stack from '$lib/ui/Stack.svelte';

	export let expression: Expression;
	export let isNested = false;

	let error = '';
	$: isInvalid = error !== '';
</script>

<div class="outer">
	<div class="inner" class:isNested class:isInvalid>
		<Stack direction="row" wrap spacing={['small', 'none']}>
			{#each expression.value as part, index}
				{#if part.type === 'operator'}
					<Operator bind:operator={part} />
				{:else if part.type === 'ref'}
					<Ref bind:ref={part} />
				{:else if part.type === 'value'}
					<Value bind:value={part} />
				{:else if part.type === 'expression'}
					<svelte:self expression={part} isNested />
				{/if}
			{/each}
		</Stack>
	</div>

	{#if error}
		<div class="error">{error}</div>
	{/if}
</div>

<style>
	.outer {
		display: flex;
		flex: 0 1 auto;
		position: relative;
	}

	.inner {
		background: var(--color-flavorBackgroundCompounding);
		border-radius: var(--borderRadius-medium);
		border-inline: var(--borderWidth-thick) solid var(--color-complementary);
		padding: var(--spacing-tiny);
	}

	.isNested {
		padding-block: 0;
		padding-inline: var(--spacing-small);
	}

	.isNested::before {
		content: '(';
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		clip-path: inset(50%);
	}

	.isNested::after {
		content: ')';
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		clip-path: inset(50%);
	}

	.isInvalid {
		outline: 2px solid red;
		outline-offset: -1px;
	}

	.error {
		background: white;
		box-shadow: 0 0 3px 0 red;
		margin: var(--spacing-small);
		margin-inline: 0;
		padding: var(--spacing-small);
		position: absolute;
		top: 100%;
		z-index: 1;
	}
</style>
