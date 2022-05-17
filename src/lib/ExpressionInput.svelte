<script lang="ts">
	import { expressionToString, isOpType, op, ref, stringToExpression, val } from '$lib/expression';
	import { getErrorMessage } from '$lib/generic';

	import type { Expression } from '$lib/types';

	export let id: string;
	export let value: Expression;

	$: stringValue = expressionToString(value);
	let error = '';
	$: invalid = error !== '';

	function onChangeExpression(e: Event) {
		if (!(e.target instanceof HTMLInputElement)) return;
		try {
			value = stringToExpression(e.target.value);
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
