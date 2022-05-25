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
		gap: var(--spacingSmall);
		padding: 0 var(--spacingMedium);
	}
</style>
