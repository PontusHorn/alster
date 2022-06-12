<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import type { HexColor } from '$lib/types';
	import Stack from '$lib/ui/Stack.svelte';

	const index = counter++;

	export let color: HexColor;
</script>

<label for="FixedColorInput-value-{index}">Value:</label>
<Stack direction="row" align="center">
	<input id="FixedColorInput-value-{index}" type="text" class="hexValue" bind:value={color.hex} />
	<input type="color" class="colorPicker" bind:value={color.hex} aria-hidden="true" />
</Stack>

<style>
	.colorPicker {
		width: 2rem;
		height: 2rem;
		padding: 0;
		background: transparent;
		border: 0;
		cursor: pointer;
	}

	.colorPicker::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.colorPicker::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}

	.hexValue {
		font-family: var(--font-monospace);
		font-weight: 350;
	}
</style>
