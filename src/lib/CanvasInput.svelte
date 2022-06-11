<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ColorInput } from '$lib/ui/Color';
	import { baseConfig } from '$lib/stores/currentWork';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import FormGroup from '$lib/ui/FormGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';

	const index = counter++;
</script>

<Stack direction="row" spacing="medium" wrap>
	<FormGroup title="Size">
		<FormGrid>
			<label for="PatternInput-width-{index}">Width:</label>
			<input id="PatternInput-width-{index}" type="number" bind:value={$baseConfig.width} />

			<label for="PatternInput-height-{index}">Height:</label>
			<input id="PatternInput-height-{index}" type="number" bind:value={$baseConfig.height} />
		</FormGrid>
	</FormGroup>

	<FormGroup title="Color">
		<ColorInput bind:color={$baseConfig.background} subjectName="background" />
	</FormGroup>
</Stack>

<style>
	input {
		width: 10em;
	}
</style>
