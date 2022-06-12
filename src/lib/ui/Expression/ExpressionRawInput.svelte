<script lang="ts">
	import { expressionToString, stringToExpression } from '$lib/utils/expression';
	import { getErrorMessage } from '$lib/utils/generic';
	import type { Expression } from '$lib/typess';

	export let id: string;
	export let expression: Expression;

	$: stringValue = expressionToString(expression);
	let error = '';
	$: invalid = error !== '';

	function onChangeExpression(e: Event) {
		if (!(e.target instanceof HTMLInputElement)) return;
		try {
			expression = stringToExpression(e.target.value);
			error = '';
		} catch (err) {
			error = getErrorMessage(err);
		}
	}
</script>

<div class="wrapper">
	<input {id} class:invalid value={stringValue} on:change={onChangeExpression} />
	{#if error}
		<div class="error">{error}</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		flex: 1 0 auto;
	}

	input {
		font-family: var(--font-monospace);
		font-weight: 350;
		width: 100%;
	}

	.invalid {
		outline: 2px solid red;
		outline-offset: -1px;
	}

	.error {
		background: white;
		box-shadow: 0 0 3px 0 red;
		margin: 0.5em 0;
		padding: 0.5em;
		position: absolute;
		top: 100%;
		z-index: 1;
	}
</style>
