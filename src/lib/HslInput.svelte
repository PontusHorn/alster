<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ExpressionInput from '$lib/ExpressionInput.svelte';
	import type { Hsl } from '$lib/types';

	const index = counter++;

	export let color: Hsl;
</script>

<label for="HslInput-hue-{index}">Hue (0-360):</label>
<ExpressionInput id="HslInput-hue-{index}" bind:value={color.hue} />

<label for="HslInput-saturation-{index}">Saturation (0-100):</label>
<ExpressionInput id="HslInput-saturation-{index}" bind:value={color.saturation} />

<label for="HslInput-lightness-{index}">Lightness (0-100):</label>
<ExpressionInput id="HslInput-lightness-{index}" bind:value={color.lightness} />
