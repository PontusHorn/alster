<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ExpressionInput from '$lib/ExpressionInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';
	import type { Rgb } from '$lib/types';

	const index = counter++;

	export let color: Rgb;
</script>

<FormGrid>
	<label for="RgbInput-red-{index}">Red (0-255):</label>
	<ExpressionInput id="RgbInput-red-{index}" bind:value={color.red} />

	<label for="RgbInput-green-{index}">Green (0-255):</label>
	<ExpressionInput id="RgbInput-green-{index}" bind:value={color.green} />

	<label for="RgbInput-blue-{index}">Blue (0-255):</label>
	<ExpressionInput id="RgbInput-blue-{index}" bind:value={color.blue} />
</FormGrid>
