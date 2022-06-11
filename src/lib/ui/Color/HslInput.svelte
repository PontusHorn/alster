<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ExpressionInput } from '$lib/ui/Expression';
	import type { Hsl } from '$lib/types';

	const index = counter++;

	export let color: Hsl;
	export let subjectName: string | undefined = undefined;
</script>

<label for="HslInput-hue-{index}">Hue (0-360):</label>
<ExpressionInput
	id="HslInput-hue-{index}"
	bind:expression={color.hue}
	editTitle={subjectName ? `Edit ${subjectName} hue` : 'Edit hue'}
>
	<p slot="editDescription">
		The hue value represents a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240
		is blue. Values outside the range will wrap (for example, 361 is the same as 1).
	</p>
</ExpressionInput>

<label for="HslInput-saturation-{index}">Saturation (0-100):</label>
<ExpressionInput
	id="HslInput-saturation-{index}"
	bind:expression={color.saturation}
	editTitle={subjectName ? `Edit ${subjectName} saturation` : 'Edit saturation'}
>
	<p slot="editDescription">
		A percentage between 0 and 100 that determines the saturation of the color. 0% is a shade of
		gray and 100% is the "pure" color.
	</p>
</ExpressionInput>

<label for="HslInput-lightness-{index}">Lightness (0-100):</label>
<ExpressionInput
	id="HslInput-lightness-{index}"
	bind:expression={color.lightness}
	editTitle={subjectName ? `Edit ${subjectName} lightness` : 'Edit lightness'}
>
	<p slot="editDescription">
		A percentage between 0 and 100 that determines the lightness of the color. 0% is black, 100% is
		white.
	</p>
</ExpressionInput>
