<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import EllipseInput from '$lib/EllipseInput.svelte';
	import { convertShape, isShapeType } from '$lib/drawing';
	import FormGrid from '$lib/FormGrid.svelte';
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

<FormGrid>
	<label for="ShapeInput-shape-{index}" class="label-shape">Shape:</label>
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
