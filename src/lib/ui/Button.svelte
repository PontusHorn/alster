<script context="module" lang="ts">
	export type ButtonVariant = 'primary' | 'ghost';
</script>

<script lang="ts">
	import type { PopoverButton } from '@rgossiaux/svelte-headlessui';

	export let variant: ButtonVariant = 'primary';
	export let icon: boolean = false;
	export let component: typeof PopoverButton | undefined = undefined;

	$: if (icon && !$$props['aria-label']) {
		throw new Error('Icon buttons require a label. Specify one with the aria-label attribute.');
	}

	$: primary = variant === 'primary';
	$: ghost = variant === 'ghost';
</script>

<span class="hook" />
{#if component}
	<svelte:component this={component} on:click {...$$restProps}>
		<div class="button" class:primary class:ghost class:icon>
			<slot />
		</div>
	</svelte:component>
{:else}
	<button on:click {...$$restProps}>
		<div class="button" class:primary class:ghost class:icon>
			<slot />
		</div>
	</button>
{/if}

<style>
	.button {
		border-radius: var(--borderRadius-medium);
		color: var(--color-primaryForeground);
		cursor: pointer;
		font-weight: 500;
		line-height: 1;
		outline: var(--borderWidth-thick) solid transparent;
		outline-offset: calc(var(--borderWidth-thick) * -1);
		padding: var(--spacing-small);
		text-align: center;
		transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out,
			outline-color 0.15s ease-in-out;
	}

	:global(*:focus-visible) > .button {
		outline-color: var(--color-secondaryForeground);
		z-index: 1;
	}

	:global([aria-expanded='true']) > .button {
		background: var(--color-flavor);
		color: white;
	}

	.primary {
		background-color: var(--color-flavorBackground);
	}

	.primary:hover {
		background-color: var(--color-flavorBackgroundDimmed);
	}

	.ghost:hover {
		background-color: var(--color-flavorBackground);
		color: var(--color-primaryForeground);
	}

	.icon {
		display: flex;
		border-radius: 50%;
		padding: var(--spacing-tiny);
	}

	/* This element is just a hook to be able to scope styles for components */
	.hook {
		display: none;
	}

	.hook + :global(*) {
		display: flex;
		justify-content: stretch;
		all: unset;
	}
</style>
