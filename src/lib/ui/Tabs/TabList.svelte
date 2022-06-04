<script>
	import { TabList } from '@rgossiaux/svelte-headlessui';
</script>

<TabList>
	<div class="list">
		<slot />
	</div>
</TabList>

<style>
	.list {
		display: flex;
		gap: var(--spacing-small);
		padding: 0 var(--spacing-medium);
	}
</style>
