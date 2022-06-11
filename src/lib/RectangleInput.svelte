<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ExpressionInput } from '$lib/ui/Expression';
	import type { Rectangle } from '$lib/types';
	import { baseConfig } from '$lib/stores/currentWork';
	import Binding from '$lib/ui/Binding.svelte';
	import { BINDING_NAME_CANVAS_HEIGHT, BINDING_NAME_CANVAS_WIDTH } from '$lib/constants';

	const index = counter++;

	export let shape: Rectangle;
</script>

<label for="RectangleInput-x-{index}">X:</label>
<ExpressionInput
	id="RectangleInput-x-{index}"
	bind:expression={shape.x}
	editTitle="Edit rectangle horizontal position"
>
	<p slot="editDescription">
		The horizontal position of the center of the rectangle. 0 is the leftmost position on the
		canvas, and {$baseConfig.width - 1} is the rightmost (that's the
		<Binding>{BINDING_NAME_CANVAS_WIDTH}</Binding> variable - 1).
	</p>
</ExpressionInput>

<label for="RectangleInput-y-{index}">Y:</label>
<ExpressionInput
	id="RectangleInput-y-{index}"
	bind:expression={shape.y}
	editTitle="Edit rectangle vertical position"
>
	<p slot="editDescription">
		The vertical position of the center of the rectangle. 0 is the topmost position on the canvas,
		and {$baseConfig.height - 1} is the bottommost (that's the
		<Binding>{BINDING_NAME_CANVAS_HEIGHT}</Binding> variable - 1).
	</p>
</ExpressionInput>

<label for="RectangleInput-width-{index}">Width:</label>
<ExpressionInput
	id="RectangleInput-width-{index}"
	bind:expression={shape.width}
	editTitle="Edit rectangle width"
>
	<p slot="editDescription">The natural (non-rotated) width of the rectangle.</p>
</ExpressionInput>

<label for="RectangleInput-height-{index}">Height:</label>
<ExpressionInput
	id="RectangleInput-height-{index}"
	bind:expression={shape.height}
	editTitle="Edit rectangle height"
>
	<p slot="editDescription">The natural (non-rotated) height of the rectangle.</p>
</ExpressionInput>

<label for="RectangleInput-rotation-{index}">Rotation:</label>
<ExpressionInput
	id="RectangleInput-rotation-{index}"
	bind:expression={shape.rotation}
	editTitle="Edit rectangle rotation (0-2π)"
>
	<p slot="editDescription">
		The clockwise rotation of the rectangle in <a href="https://en.wikipedia.org/wiki/Radian"
			>radians</a
		>. 1 radian is approximately 57 degrees, and a full 360° turn is equal to 2 × π (around 6.28)
		radians.
	</p>
</ExpressionInput>
