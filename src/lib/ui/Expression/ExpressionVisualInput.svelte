<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import type { Expression } from '$lib/types';
	import { setEditedExpressionPartContext } from '$lib/ui/Expression/context';
	import ExpressionPartsEditor from '$lib/ui/Expression/ExpressionPartsEditor.svelte';
	import ExpressionPartsSelector from '$lib/ui/Expression/ExpressionPartsSelector.svelte';
	import { writable } from 'svelte/store';

	const id = String(counter++);
	setEditedExpressionPartContext(writable());

	export let expression: Expression;

	let error = '';
</script>

<ExpressionPartsSelector {expression} parentId={id} />
<ExpressionPartsEditor bind:expression parentId={id} />

{#if error}
	<div class="error">{error}</div>
{/if}

<style>
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
