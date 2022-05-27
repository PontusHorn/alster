<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { iterations, shapes } from '$lib/stores';
	import type { Expression, Iteration, Rectangle, Shape } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import HorizontalDivider from '$lib/ui/HorizontalDivider.svelte';
	import { getIteration, getShape } from '$lib/utils/config';
	import { makeNumberedColor, mapShapeExpressions } from '$lib/utils/drawing';
	import { isRef, mapExpressionTokens, toExp } from '$lib/utils/expression';
	import { randomId } from '$lib/utils/generic';

	const index = counter++;

	export let iteration: Iteration;

	function updateIteration(iteration: Iteration) {
		const index = $iterations.findIndex(({ id }) => id === iteration.id);
		$iterations[index] = iteration;
	}

	function updateShape(shape: Shape) {
		const index = $shapes.findIndex(({ id }) => id === shape.id);
		$shapes[index] = shape;
	}

	function updateName(newName: string) {
		const oldName = iteration.name;

		updateIteration({ ...iteration, name: newName });

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
		value={iteration.start}
		on:input={(e) => updateIteration({ ...iteration, start: e.currentTarget.valueAsNumber })}
	/>

	<label for="IterationInput-end-{index}">End:</label>
	<input
		id="IterationInput-end-{index}"
		type="number"
		value={iteration.end}
		on:input={(e) => updateIteration({ ...iteration, end: e.currentTarget.valueAsNumber })}
	/>
</FormGrid>

<HorizontalDivider />

<div>
	<Button on:click={addShape}>Add shape</Button>
	<Button on:click={addChildIteration}>Add iteration</Button>
</div>
