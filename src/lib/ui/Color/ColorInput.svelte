<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import {
		ColorTypeInformation,
		FixedColorInput,
		HslInput,
		NumberedColorInput,
		RgbInput
	} from '$lib/ui/Color';
	import { ColorType, type Color } from '$lib/types';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import Icon from '$lib/ui/Icon.svelte';
	import Popover from '$lib/ui/Popover.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { isColorType, makeColor } from '$lib/utils/drawing';

	const index = counter++;

	export let color: Color;
	export let subjectName: string | undefined = undefined;

	function onChangeColorType(e: Event) {
		if (!(e.target instanceof HTMLSelectElement)) return;
		const colorType = e.target.value;
		if (!isColorType(colorType)) return;
		color = makeColor(colorType);
	}
</script>

<FormGrid>
	<label for="ColorInput-type-{index}">Color:</label>
	<Stack direction="row" align="center">
		<select
			id="ColorInput-type-{index}"
			class="colorType"
			value={color.type}
			on:change={onChangeColorType}
		>
			<option value={ColorType.Hsl}>HSL</option>
			<option value={ColorType.Rgb}>RGB</option>
			<option value={ColorType.Hex}>Fixed color</option>
			<option value={ColorType.Numbered}>Numbered color</option>
			<option value={ColorType.Random}>Random color</option>
		</select>
		<Popover icon variant="ghost" aria-label="More information" position="bottom">
			<span slot="button"><Icon icon="Info" /></span>
			<ColorTypeInformation slot="panel" />
		</Popover>
	</Stack>

	{#if color.type === ColorType.Hsl}
		<HslInput bind:color {subjectName} />
	{:else if color.type === ColorType.Rgb}
		<RgbInput bind:color {subjectName} />
	{:else if color.type === ColorType.Hex}
		<FixedColorInput bind:color />
	{:else if color.type === ColorType.Numbered}
		<NumberedColorInput bind:color {subjectName} />
	{:else if color.type === ColorType.Random}
		<!-- No inputs -->
	{:else}
		Invalid color
	{/if}
</FormGrid>

<style>
	.colorType {
		flex: 1 0 auto;
	}
</style>
