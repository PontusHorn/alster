<script lang="ts">
	import type { Expression, Token } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import { getEditedExpressionPartContext } from '$lib/ui/Expression/context';
	import { getPartEditorId } from '$lib/ui/Expression/ExpressionPartsEditor.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { getOperatorName, getOperatorSymbol } from '$lib/utils/expression';

	const editedPart = getEditedExpressionPartContext();

	export let parentId: string;
	export let expression: Expression;
	export let isNested = false;

	function getTokenText(token: Token): string {
		switch (token.type) {
			case 'operator':
				return getOperatorSymbol(token.value);
			case 'ref':
				return token.name;
			case 'value':
				return String(token.value);
		}
	}

	function getTokenLabel(token: Token): string | undefined {
		switch (token.type) {
			case 'operator':
				return getOperatorName(token.value);
			case 'ref':
			case 'value':
				return undefined;
		}
	}
</script>

<div class="outer">
	<div class="inner" class:isNested>
		<Stack direction="row" wrap spacing={['small', 'none']}>
			{#each expression.value as part, index}
				{@const partId = `${parentId}-${index}`}
				{#if part.type === 'expression'}
					<svelte:self expression={part} isNested parentId={partId} />
				{:else}
					<Button
						variant="ghost"
						aria-label={getTokenLabel(part)}
						on:click={() => ($editedPart = part)}
						aria-controls={getPartEditorId(partId)}
						aria-expanded={part === $editedPart}
					>
						{getTokenText(part)}
					</Button>
				{/if}
			{/each}
		</Stack>
	</div>
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
</style>
