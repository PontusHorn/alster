<script lang="ts">
	import { expressionToString, isOpType, op, ref, stringToExpression, val } from '$lib/expression';

	import type { Expression } from '$lib/types';

	export let id: string;
	export let value: Expression;

	$: stringValue = expressionToString(value);

	function onChangeExpression(e: Event) {
		if (!(e.target instanceof HTMLInputElement)) return;
		const parsedExpression = stringToExpression(e.target.value);
		if (parsedExpression) {
			value = parsedExpression;
		}
	}
</script>

<input {id} value={stringValue} on:change={onChangeExpression} />
