<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import ExpressionInput from '$lib/ExpressionInput.svelte';
	import type { NumberedColor } from '$lib/types';
	import FormGrid from '$lib/ui/FormGrid.svelte';

	const index = counter++;

	export let color: NumberedColor;
</script>

<label for="NumberedColorInput-value-{index}">Value:</label>
<ExpressionInput id="NumberedColorInput-value-{index}" bind:value={color.value} />
