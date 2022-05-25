<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ExpressionInput from '$lib/ExpressionInput.svelte';
	import type { Rectangle } from '$lib/types';

	const index = counter++;

	export let shape: Rectangle;
</script>

<label for="RectangleInput-x-{index}">X:</label>
<ExpressionInput id="RectangleInput-x-{index}" bind:value={shape.x} />

<label for="RectangleInput-y-{index}">Y:</label>
<ExpressionInput id="RectangleInput-y-{index}" bind:value={shape.y} />

<label for="RectangleInput-width-{index}">Width:</label>
<ExpressionInput id="RectangleInput-width-{index}" bind:value={shape.width} />

<label for="RectangleInput-height-{index}">Height:</label>
<ExpressionInput id="RectangleInput-height-{index}" bind:value={shape.height} />

<label for="RectangleInput-rotation-{index}">Rotation:</label>
<ExpressionInput id="RectangleInput-rotation-{index}" bind:value={shape.rotation} />
