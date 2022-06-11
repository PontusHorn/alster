<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ExpressionInput } from '$lib/ui/Expression';
	import type { Ellipse } from '$lib/types';
	import { baseConfig } from '$lib/stores/currentWork';
	import { BINDING_NAME_CANVAS_HEIGHT, BINDING_NAME_CANVAS_WIDTH } from '$lib/constants';
	import Binding from '$lib/ui/Binding.svelte';

	const index = counter++;

	export let shape: Ellipse;
</script>

<label for="EllipseInput-x-{index}">X:</label>
<ExpressionInput
	id="EllipseInput-x-{index}"
	bind:expression={shape.x}
	editTitle="Edit ellipse horizontal position"
>
	<p slot="editDescription">
		The horizontal position of the center of the ellipse. 0 is the leftmost position on the canvas,
		and {$baseConfig.width - 1} is the rightmost (that's the
		<Binding>{BINDING_NAME_CANVAS_WIDTH}</Binding> variable - 1).
	</p>
</ExpressionInput>

<label for="EllipseInput-y-{index}">Y:</label>
<ExpressionInput
	id="EllipseInput-y-{index}"
	bind:expression={shape.y}
	editTitle="Edit ellipse vertical position"
>
	<p slot="editDescription">
		The vertical position of the center of the ellipse. 0 is the topmost position on the canvas, and {$baseConfig.height -
			1} is the bottommost (that's the
		<Binding>{BINDING_NAME_CANVAS_HEIGHT}</Binding> variable - 1).
	</p>
</ExpressionInput>

<label for="EllipseInput-width-{index}">Width:</label>
<ExpressionInput
	id="EllipseInput-width-{index}"
	bind:expression={shape.width}
	editTitle="Edit ellipse width"
>
	<p slot="editDescription">The natural (non-rotated) width of the ellipse.</p>
</ExpressionInput>

<label for="EllipseInput-height-{index}">Height:</label>
<ExpressionInput
	id="EllipseInput-height-{index}"
	bind:expression={shape.height}
	editTitle="Edit ellipse height"
>
	<p slot="editDescription">The natural (non-rotated) height of the ellipse.</p>
</ExpressionInput>

<label for="EllipseInput-rotation-{index}">Rotation:</label>
<ExpressionInput
	id="EllipseInput-rotation-{index}"
	bind:expression={shape.rotation}
	editTitle="Edit ellipse rotation (0-2π)"
>
	<p slot="editDescription">
		The clockwise rotation of the ellipse in <a href="https://en.wikipedia.org/wiki/Radian"
			>radians</a
		>. 1 radian is approximately 57 degrees, and a full 360° turn is equal to 2 × π (around 6.28)
		radians.
	</p>
</ExpressionInput>
