<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { iterations, shapes } from '$lib/stores/currentWork';
	import { editedItem } from '$lib/stores/ui';
	import type { Expression, Iteration, Shape } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import HorizontalDivider from '$lib/ui/HorizontalDivider.svelte';
	import { getIteration, getShape, makeIteration, makeShape } from '$lib/utils/config';
	import { makeNumberedColor, mapShapeExpressions } from '$lib/utils/drawing';
	import { isRef, mapExpressionTokens, toExp } from '$lib/utils/expression';

	const index = counter++;

	export let iterationId: Iteration['id'];
	$: iterationIndex = $iterations.findIndex(({ id }) => id === iterationId);
	$: iteration = $iterations[iterationIndex];

	function updateShape(shape: Shape) {
		const index = $shapes.findIndex(({ id }) => id === shape.id);
		$shapes[index] = shape;
	}

	function updateName(newName: string) {
		const oldName = iteration.name;
		$iterations[iterationIndex].name = newName;

		/* We also need to update any refs that refer to the old iteration name in any expressions of
		the sub-iterations or shapes for this iteration. */
		updateIterationRefs(oldName, newName, iteration);
	}

	function updateIterationRefs(oldName: string, newName: string, iteration: Iteration): void {
		for (const shapeId of iteration.shapeIds) {
			const shape = getShape($shapes, shapeId);
			updateShapeRefs(oldName, newName, shape);
		}
		for (const iterationId of iteration.iterationIds) {
			const childIteration = getIteration($iterations, iterationId);
			updateIterationRefs(oldName, newName, childIteration);
		}
	}

	function updateShapeRefs(oldName: string, newName: string, shape: Shape): void {
		updateShape(
			mapShapeExpressions(shape, (expression) =>
				updateRefsInExpression(oldName, newName, expression)
			)
		);
	}

	function updateRefsInExpression(
		oldName: string,
		newName: string,
		expression: Expression
	): Expression {
		return mapExpressionTokens(expression, (token) =>
			isRef(token) && token.name === oldName ? { ...token, name: newName } : token
		);
	}

	function addShape() {
		const shape = makeShape({
			color: makeNumberedColor(`$${iteration.name}`),
			x: toExp(`$${iteration.name} * 10`),
			y: toExp(`$${iteration.name} * 10`)
		});

		$shapes = [...$shapes, shape];
		$editedItem = shape;
		$iterations[iterationIndex].shapeIds = [...iteration.shapeIds, shape.id];
	}

	function addChildIteration() {
		const childIteration = makeIteration({
			name: `${iteration.name}Child`,
			start: 0,
			end: 10,
			shapeIds: [],
			iterationIds: []
		});

		$iterations = [...$iterations, childIteration];
		$editedItem = childIteration;
		$iterations[iterationIndex].iterationIds = [...iteration.iterationIds, childIteration.id];
	}
</script>

<FormGrid>
	<label for="IterationInput-name-{index}">Name:</label>
	<input
		id="IterationInput-name-{index}"
		type="text"
		value={iteration.name}
		on:change={(e) => updateName(e.currentTarget.value)}
	/>

	<label for="IterationInput-start-{index}">Start:</label>
	<input
		id="IterationInput-start-{index}"
		type="number"
		bind:value={$iterations[iterationIndex].start}
	/>

	<label for="IterationInput-end-{index}">End:</label>
	<input
		id="IterationInput-end-{index}"
		type="number"
		bind:value={$iterations[iterationIndex].end}
	/>
</FormGrid>

<HorizontalDivider />

<div>
	<Button on:click={addShape}>Add shape</Button>
	<Button on:click={addChildIteration}>Add iteration</Button>
</div>
