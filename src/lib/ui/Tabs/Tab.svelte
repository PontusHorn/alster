<script>
	import { Tab } from '@rgossiaux/svelte-headlessui';
</script>

<div>
	<Tab class={({ selected }) => (selected ? 'tab selected' : 'tab')}>
		<slot />
	</Tab>
</div>

<style>
	div > :global(.tab) {
		background: var(--color-neutralBackgroundDimmed);
		border-top-left-radius: var(--borderRadius-medium);
		border-top-right-radius: var(--borderRadius-medium);
		border: var(--borderWidth-thick) solid transparent;
		border-bottom: none;
		cursor: pointer;
		font-weight: 600;
		letter-spacing: var(--letterSpacing-heading);
		line-height: 1;
		padding: var(--spacing-medium);
		transition: all 0.15s ease-in-out;
	}

	div > :global(.tab:hover) {
		background: var(--color-neutralBackground);
	}

	div > :global(.selected) {
		background: var(--color-neutralBackground);
		border-color: var(--color-flavor);
		margin-bottom: calc(0px - var(--borderWidth-thick));
		opacity: 1;
		padding-bottom: calc(var(--spacing-medium) + var(--borderWidth-thick));
	}
</style>
