<script lang="ts">
	import type { Ref } from '$lib/types';
	import Popover from '$lib/ui/Popover.svelte';

	export let ref: Ref;
</script>

<Popover variant="ghost">
	<span slot="button">{ref.name}</span>
	<div slot="panel" class="panelContent">
		The value of the "{ref.name}" variable
	</div>
</Popover>

<style>
	.panelContent {
		min-width: 200px;
		padding: var(--spacing-small);
		text-align: center;
	}
</style>
