<script lang="ts">
	import { spacingVar, type ThemeSpacing } from '$lib/design';

	export let as: 'div' | 'ul' | 'li' = 'div';
	export let direction: 'row' | 'column' | undefined = undefined;
	export let spacing: ThemeSpacing | [ThemeSpacing, ThemeSpacing] | undefined = undefined;
	export let align: 'start' | 'end' | 'center' | 'stretch' | undefined = undefined;
	export let justify:
		| 'start'
		| 'end'
		| 'center'
		| 'normal'
		| 'space-between'
		| 'stretch'
		| undefined = undefined;
	export let wrap: true | undefined = undefined;
</script>

<svelte:element
	this={as}
	class="stack"
	style:flex-direction={direction}
	style:gap={spacing &&
		(Array.isArray(spacing) ? spacing.map(spacingVar).join(' ') : spacingVar(spacing))}
	style:align-items={align}
	style:justify-content={justify}
	style:flex-wrap={wrap && 'wrap'}
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
