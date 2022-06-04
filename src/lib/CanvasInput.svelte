<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ColorInput from '$lib/ColorInput.svelte';
	import { rootConfig } from '$lib/stores/config';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import FormGroup from '$lib/ui/FormGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';

	const index = counter++;
</script>

<Stack direction="row" spacing="medium">
	<FormGroup title="Size">
		<FormGrid>
			<label for="PatternInput-width-{index}">Width:</label>
			<input id="PatternInput-width-{index}" type="number" bind:value={$rootConfig.width} />

			<label for="PatternInput-height-{index}">Height:</label>
			<input id="PatternInput-height-{index}" type="number" bind:value={$rootConfig.height} />
		</FormGrid>
	</FormGroup>

	<FormGroup title="Color">
		<ColorInput bind:color={$rootConfig.background} />
	</FormGroup>
</Stack>

<style>
	input {
		width: 10em;
	}
</style>
