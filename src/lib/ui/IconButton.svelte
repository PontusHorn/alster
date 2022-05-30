<script lang="ts">
	import Icon, { type IconName } from '$lib/ui/Icon.svelte';

	export let icon: IconName;
	export let label: string;
	export let controls: string | undefined = undefined;
	export let expanded: boolean | undefined = undefined;
</script>

<button on:click aria-label={label} aria-controls={controls} aria-expanded={expanded}>
	<Icon {icon} />
</button>

<style>
	button {
		display: flex;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 50%;
		color: var(--primaryForeground);
		cursor: pointer;
		outline: var(--borderWidthThick) solid transparent;
		padding: var(--spacingTiny);
		transition: background-color 0.15s ease-in-out, outline-color 0.15s ease-in-out;
	}

	button[aria-expanded='true'] {
		background: var(--flavorColor);
		color: white;
	}

	button:hover,
	button:focus-visible {
		outline-color: var(--secondaryForeground);
	}
</style>
