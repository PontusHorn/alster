<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { isColorType, makeColor } from '$lib/drawing';
	import FormGrid from '$lib/FormGrid.svelte';
	import HslInput from '$lib/HslInput.svelte';
	import RgbInput from '$lib/RgbInput.svelte';
	import type { Color } from '$lib/types';

	const index = counter++;

	export let color: Color;

	function onChangeColorType(e: Event) {
		if (!(e.target instanceof HTMLSelectElement)) return;
		const colorType = e.target.value;
		if (!isColorType(colorType)) return;
		color = makeColor(colorType);
	}
</script>

<FormGrid>
	<label for="ColorInput-type-{index}" class="label-type">Color:</label>
	<select id="ColorInput-type-{index}" value={color.type} on:change={onChangeColorType}>
		<option value="hsl">HSL</option>
		<option value="rgb">RGB</option>
		<option value="randomColor">Random color</option>
	</select>
</FormGrid>

{#if color.type === 'hsl'}
	<HslInput bind:color />
{:else if color.type === 'rgb'}
	<RgbInput bind:color />
{:else if color.type === 'randomColor'}
	<!-- No inputs -->
{:else}
	Invalid color
{/if}
