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
		background: var(--neutralBackgroundDimmed);
		border-top-left-radius: var(--borderRadius);
		border-top-right-radius: var(--borderRadius);
		border: var(--borderWidthThick) solid transparent;
		border-bottom: none;
		cursor: pointer;
		font-weight: 600;
		letter-spacing: var(--letterSpacingHeading);
		line-height: 1;
		padding: var(--spacingMedium);
		transition: all 0.15s ease-in-out;
	}

	div > :global(.tab:hover) {
		background: var(--neutralBackground);
	}

	div > :global(.selected) {
		background: var(--neutralBackground);
		border-color: var(--flavorColor);
		margin-bottom: calc(0px - var(--borderWidthThick));
		opacity: 1;
		padding-bottom: calc(var(--spacingMedium) + var(--borderWidthThick));
	}
</style>
