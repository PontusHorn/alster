<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { iterations, shapes } from '$lib/stores';
	import type { Iteration, Rectangle } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import HorizontalDivider from '$lib/ui/HorizontalDivider.svelte';
	import { makeNumberedColor } from '$lib/utils/drawing';
	import { toExp } from '$lib/utils/expression';
	import { randomId } from '$lib/utils/generic';

	const index = counter++;

	export let iteration: Iteration;

	function addShape() {
		const shape: Rectangle = {
			type: 'shape',
			shapeType: 'rectangle',
			id: randomId(),
			color: makeNumberedColor(`$${iteration.name}`),
			x: toExp(`$${iteration.name} * 10`),
			y: toExp(`$${iteration.name} * 10`),
			width: toExp(100),
			height: toExp(100),
			rotation: toExp(0)
		};

		shapes.set([...$shapes, shape]);
		iteration.shapeIds = [...iteration.shapeIds, shape.id];
	}

	function addChildIteration() {
		const childIteration: Iteration = {
			type: 'iteration',
			id: randomId(),
			name: `${iteration.name}Child`,
			start: 0,
			end: 10,
			shapeIds: [],
			iterationIds: []
		};

		iterations.set([...$iterations, childIteration]);
		iteration.iterationIds = [...iteration.iterationIds, childIteration.id];
	}
</script>

<FormGrid>
	<label for="IterationInput-start-{index}">Start:</label>
	<input id="IterationInput-start-{index}" type="number" bind:value={iteration.start} />

	<label for="IterationInput-end-{index}">End:</label>
	<input id="IterationInput-end-{index}" type="number" bind:value={iteration.end} />
</FormGrid>

<HorizontalDivider />

<div>
	<Button on:click={addShape}>Add shape</Button>
	<Button on:click={addChildIteration}>Add iteration</Button>
</div>
