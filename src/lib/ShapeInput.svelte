<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ColorInput from '$lib/ColorInput.svelte';
	import { convertShape, isShapeType } from '$lib/drawing';
	import EllipseInput from '$lib/EllipseInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';
	import FormGroup from '$lib/FormGroup.svelte';
	import RectangleInput from '$lib/RectangleInput.svelte';
	import type { Shape } from '$lib/types';

	const index = counter++;

	export let shape: Shape;

	function onChangeShapeType(e: Event) {
		if (!(e.target instanceof HTMLSelectElement)) return;
		const shapeType = e.target.value;
		if (!isShapeType(shapeType)) return;

		shape = convertShape(shape, shapeType);
	}
</script>

<FormGroup title="Shape">
	<FormGrid>
		<label for="ShapeInput-shape-{index}" class="label-shape">Shape type:</label>
		<select id="ShapeInput-shape-{index}" value={shape.type} on:change={onChangeShapeType}>
			<option value="rectangle">Rectangle</option>
			<option value="ellipse">Ellipse</option>
		</select>
	</FormGrid>

	{#if shape.type === 'rectangle'}
		<RectangleInput bind:shape />
	{:else if shape.type === 'ellipse'}
		<EllipseInput bind:shape />
	{:else}
		Invalid shape
	{/if}
</FormGroup>

<FormGroup title="Color">
	<ColorInput bind:color={shape.color} />
</FormGroup>
