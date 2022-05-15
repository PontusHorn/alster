<script context="module" lang="ts">
	import { val } from '$lib/expression';

	let counter = 0;

	const SHAPE_DEFAULTS: Record<Shape['type'], Shape> = {
		rectangle: {
			type: 'rectangle',
			color: { type: 'randomColor' },
			x: [val(0)],
			y: [val(0)],
			width: [val(100)],
			height: [val(100)]
		}
	};
</script>

<script lang="ts">
	import { isShapeType } from '$lib/drawing';
	import type { Pattern, Shape } from '$lib/types';
	import ShapeInput from '$lib/ShapeInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';
	import FormGroup from '$lib/FormGroup.svelte';

	const index = counter++;

	export let pattern: Pattern;

	function onChangeShapeType(e: Event) {
		if (!(e.target instanceof HTMLInputElement)) return;
		const shapeType = e.target.value;
		if (!isShapeType(shapeType)) return;
		pattern.each.shape = { ...SHAPE_DEFAULTS[shapeType] };
	}
</script>

<FormGroup>
	<h2>Pattern</h2>

	<FormGrid>
		<label for="PatternInput-start-{index}">Start:</label>
		<input id="PatternInput-start-{index}" type="number" bind:value={pattern.start} />

		<label for="PatternInput-end-{index}">End:</label>
		<input id="PatternInput-end-{index}" type="number" bind:value={pattern.end} />
	</FormGrid>

	<FormGroup>
		<FormGrid>
			<label for="PatternInput-shape-{index}" class="label-shape">Shape:</label>
			<select
				id="PatternInput-shape-{index}"
				value={pattern.each.shape.type}
				on:change={onChangeShapeType}
			>
				<option value="rectangle">Rectangle</option>
			</select>
		</FormGrid>

		<ShapeInput bind:shape={pattern.each.shape} />
	</FormGroup>
</FormGroup>
