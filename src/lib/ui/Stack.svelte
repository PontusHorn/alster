<script lang="ts">
	import { spacingVar, type ThemeSpacing } from '$lib/design';

	export let as: 'div' | 'ul' | 'li' = 'div';
	export let direction: 'row' | 'column' | undefined = undefined;
	export let spacing: ThemeSpacing | undefined = undefined;
	export let align: 'start' | 'end' | 'center' | 'stretch' | undefined = undefined;
	export let justify: 'start' | 'end' | 'center' | 'normal' | 'space-between' | undefined =
		undefined;
</script>

<svelte:element
	this={as}
	class="stack"
	style:flex-direction={direction}
	style:gap={spacing && spacingVar(spacing)}
	style:align-items={align}
	style:justify-content={justify}
>
	<slot />
</svelte:element>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-small);
		list-style: none;
		padding: 0;
	}
</style>
