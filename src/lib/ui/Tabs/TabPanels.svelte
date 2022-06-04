<script>
	import { TabPanels } from '@rgossiaux/svelte-headlessui';
</script>

<TabPanels>
	<div class="panels">
		<slot />
	</div>
</TabPanels>

<style>
	.panels {
		background: var(--color-neutralBackground);
		border-radius: var(--borderRadius-medium);
		border: var(--borderWidth-thick) solid var(--color-flavor);
	}
</style>
