<script lang="ts">
	import { OperatorType, type Operator } from '$lib/types';
	import Popover from '$lib/ui/Popover.svelte';
	import { getOperatorName, getOperatorSymbol } from '$lib/utils/expression';

	export let operator: Operator;

	function onChangeOperator(
		event: Event & { currentTarget: EventTarget & HTMLSelectElement }
	): void {
		operator = {
			type: 'operator',
			value: event.currentTarget.value as OperatorType
		};
	}
</script>

<Popover variant="ghost" aria-label={getOperatorName(operator.value)}>
	<span slot="button">{getOperatorSymbol(operator.value)}</span>
	<div slot="panel" class="panelContent">
		Operator: <select value={operator.value} on:change={onChangeOperator}>
			{#each Object.values(OperatorType) as type}
				<option value={type}>{getOperatorSymbol(type)} ({getOperatorName(type)})</option>
			{/each}
		</select>
	</div>
</Popover>

<style>
	.panelContent {
		min-width: 200px;
		padding: var(--spacing-small);
		text-align: center;
	}
</style>
