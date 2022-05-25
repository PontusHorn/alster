<script lang="ts">
	import { assets } from '$app/paths';

	export let icon: 'Edit';
	export let label: string;
	export let controls: string | undefined = undefined;
	export let expanded: boolean | undefined = undefined;
</script>

<button on:click aria-label={label} aria-controls={controls} aria-expanded={expanded}>
	<img src="{assets}/icons/{icon}.svg" alt="" />
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
	}

	button:hover,
	button:focus-visible {
		outline-color: var(--secondaryForeground);
	}

	img {
		width: 24px;
		height: 24px;
	}
</style>
