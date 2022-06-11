<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ExpressionInput } from '$lib/ui/Expression';
	import type { Rgb } from '$lib/types';

	const index = counter++;

	export let color: Rgb;
	export let subjectName: string | undefined = undefined;
</script>

<label for="RgbInput-red-{index}">Red (0-255):</label>
<ExpressionInput
	id="RgbInput-red-{index}"
	bind:expression={color.red}
	editTitle={`Edit ${subjectName ? `${subjectName} ` : ''} red value`}
/>

<label for="RgbInput-green-{index}">Green (0-255):</label>
<ExpressionInput
	id="RgbInput-green-{index}"
	bind:expression={color.green}
	editTitle={`Edit ${subjectName ? `${subjectName} ` : ''} blue value`}
/>

<label for="RgbInput-blue-{index}">Blue (0-255):</label>
<ExpressionInput
	id="RgbInput-blue-{index}"
	bind:expression={color.blue}
	editTitle={`Edit ${subjectName ? `${subjectName} ` : ''} green value`}
/>
