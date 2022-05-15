<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { isColorType, makeColor } from '$lib/drawing';
	import FormGrid from '$lib/FormGrid.svelte';
	import HslInput from '$lib/HslInput.svelte';
	import NumberedColorInput from '$lib/NumberedColorInput.svelte';
	import RgbInput from '$lib/RgbInput.svelte';
	import { ColorType, type Color } from '$lib/types';

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
		<option value={ColorType.Hsl}>HSL</option>
		<option value={ColorType.Rgb}>RGB</option>
		<option value={ColorType.Hex}>Fixed color</option>
		<option value={ColorType.Numbered}>Numbered color</option>
		<option value={ColorType.Random}>Random color</option>
	</select>
</FormGrid>

{#if color.type === ColorType.Hsl}
	<HslInput bind:color />
{:else if color.type === ColorType.Rgb}
	<RgbInput bind:color />
{:else if color.type === ColorType.Hex}
	<input type="color" bind:value={color.hex} />
{:else if color.type === ColorType.Numbered}
	<NumberedColorInput bind:color />
{:else if color.type === ColorType.Random}
	<!-- No inputs -->
{:else}
	Invalid color
{/if}
