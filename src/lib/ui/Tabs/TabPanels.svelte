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
		background: var(--neutralBackground);
		border-radius: var(--borderRadius);
		border: var(--borderWidthThick) solid var(--flavorColor);
	}
</style>
