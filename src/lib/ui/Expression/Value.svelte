<script lang="ts">
	import InputAutoWidth from '$lib/InputAutoWidth.svelte';

	import type { Value } from '$lib/types';
	import Popover from '$lib/ui/Popover.svelte';

	export let value: Value;
</script>

<Popover variant="ghost">
	<span slot="button">{value.value}</span>
	<div slot="panel" class="panelContent">
		The constant value: <InputAutoWidth type="number" step="any" bind:value={value.value} />
	</div>
</Popover>

<style>
	.panelContent {
		min-width: 200px;
		padding: var(--spacing-small);
		text-align: center;
	}
</style>
