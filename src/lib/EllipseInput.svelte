<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ExpressionInput from '$lib/ExpressionInput.svelte';
	import type { Ellipse } from '$lib/types';

	const index = counter++;

	export let shape: Ellipse;
</script>

<label for="EllipseInput-x-{index}">X:</label>
<ExpressionInput id="EllipseInput-x-{index}" bind:value={shape.x} />

<label for="EllipseInput-y-{index}">Y:</label>
<ExpressionInput id="EllipseInput-y-{index}" bind:value={shape.y} />

<label for="EllipseInput-width-{index}">Width:</label>
<ExpressionInput id="EllipseInput-width-{index}" bind:value={shape.width} />

<label for="EllipseInput-height-{index}">Height:</label>
<ExpressionInput id="EllipseInput-height-{index}" bind:value={shape.height} />

<label for="EllipseInput-rotation-{index}">Rotation:</label>
<ExpressionInput id="EllipseInput-rotation-{index}" bind:value={shape.rotation} />
