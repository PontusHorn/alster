<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import type { Pattern } from '$lib/types';
	import ShapeInput from '$lib/ShapeInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';
	import FormGroup from '$lib/FormGroup.svelte';

	const index = counter++;

	export let pattern: Pattern;
</script>

<FormGroup title="Pattern" open>
	<FormGrid>
		<label for="PatternInput-start-{index}">Start:</label>
		<input id="PatternInput-start-{index}" type="number" bind:value={pattern.start} />

		<label for="PatternInput-end-{index}">End:</label>
		<input id="PatternInput-end-{index}" type="number" bind:value={pattern.end} />
	</FormGrid>

	<ShapeInput bind:shape={pattern.each.shape} />
</FormGroup>
