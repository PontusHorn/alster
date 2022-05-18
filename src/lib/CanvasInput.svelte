<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ColorInput from '$lib/ColorInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';
	import FormGroup from '$lib/FormGroup.svelte';
	import type { Color } from '$lib/types';

	const index = counter++;

	export let background: Color;
	export let width: number;
	export let height: number;
</script>

<FormGroup title="Canvas" open>
	<FormGroup title="Size">
		<FormGrid>
			<label for="PatternInput-width-{index}">Width:</label>
			<input id="PatternInput-width-{index}" type="number" bind:value={width} />

			<label for="PatternInput-height-{index}">Height:</label>
			<input id="PatternInput-height-{index}" type="number" bind:value={height} />
		</FormGrid>
	</FormGroup>

	<FormGroup title="Color">
		<ColorInput bind:color={background} />
	</FormGroup>
</FormGroup>
