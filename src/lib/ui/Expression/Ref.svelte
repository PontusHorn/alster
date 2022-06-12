<script lang="ts">
	import type { Ref } from '$lib/types';
	import Binding from '$lib/ui/Binding.svelte';
	import Popover from '$lib/ui/Popover.svelte';

	export let ref: Ref;
</script>

<Popover variant="ghost">
	<span slot="button"><Binding>{ref.name}</Binding></span>
	<div slot="panel" class="panelContent">
		The value of the <Binding>{ref.name}</Binding> variable
	</div>
</Popover>

<style>
	.panelContent {
		min-width: 200px;
		padding: var(--spacing-small);
		text-align: center;
	}
</style>
