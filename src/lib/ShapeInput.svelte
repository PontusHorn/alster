<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ColorInput } from '$lib/ui/Color';
	import EllipseInput from '$lib/EllipseInput.svelte';
	import RectangleInput from '$lib/RectangleInput.svelte';
	import type { Shape } from '$lib/types';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import FormSubGroup from '$lib/ui/FormSubGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { convertShape, getShapeName, isShapeType } from '$lib/utils/drawing';

	const index = counter++;

	export let shape: Shape;

	function onChangeShapeType(e: Event) {
		if (!(e.target instanceof HTMLSelectElement)) return;
		const shapeType = e.target.value;
		if (!isShapeType(shapeType)) return;

		shape = convertShape(shape, shapeType);
	}
</script>

<Stack direction="column" spacing="large">
	<FormSubGroup title="Shape">
		<FormGrid>
			<label for="ShapeInput-shape-{index}" class="label-shape">Shape type:</label>
			<select id="ShapeInput-shape-{index}" value={shape.shapeType} on:change={onChangeShapeType}>
				<option value="rectangle">{getShapeName('rectangle')}</option>
				<option value="ellipse">{getShapeName('ellipse')}</option>
			</select>

			{#if shape.shapeType === 'rectangle'}
				<RectangleInput bind:shape />
			{:else if shape.shapeType === 'ellipse'}
				<EllipseInput bind:shape />
			{:else}
				Invalid shape
			{/if}
		</FormGrid>
	</FormSubGroup>

	<FormSubGroup title="Color">
		<ColorInput bind:color={shape.color} subjectName={shape.shapeType} />
	</FormSubGroup>
</Stack>
