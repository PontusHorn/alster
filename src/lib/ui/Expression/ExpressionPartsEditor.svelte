<script context="module" lang="ts">
	export function getPartEditorId(partId: string): string {
		return `part-editor-${partId}`;
	}
</script>

<script lang="ts">
	import InputAutoWidth from '$lib/InputAutoWidth.svelte';
	import { OperatorType, type Expression } from '$lib/types';
	import Binding from '$lib/ui/Binding.svelte';
	import { getEditedExpressionPartContext } from '$lib/ui/Expression/context';
	import { getOperatorName, getOperatorSymbol } from '$lib/utils/expression';

	const editedPart = getEditedExpressionPartContext();

	export let parentId: string;
	export let expression: Expression;
</script>

{#each expression.value as part, index}
	{@const partId = `${parentId}-${index}`}
	{#if part.type === 'expression'}
		<svelte:self bind:expression={part} parentId={partId} />
	{:else}
		<div id={getPartEditorId(partId)} hidden={part !== $editedPart}>
			{#if part.type === 'operator'}
				Operator:
				<select bind:value={part.value}>
					{#each Object.values(OperatorType) as type}
						<option value={type}>{getOperatorSymbol(type)} ({getOperatorName(type)})</option>
					{/each}
				</select>
			{:else if part.type === 'ref'}
				The value of the <Binding>{part.name}</Binding> variable
			{:else if part.type === 'value'}
				The constant value:
				<InputAutoWidth type="number" step="any" bind:value={part.value} />
			{/if}
		</div>
	{/if}
{/each}
