<script lang="ts">
	import { spacingVar, type ThemeSpacing } from '$lib/design';

	export let direction: 'row' | 'column' | undefined = undefined;
	export let spacing: ThemeSpacing | undefined = undefined;
	export let align: 'start' | 'end' | 'center' | 'stretch' | undefined = undefined;
	export let justify: 'start' | 'end' | 'center' | 'normal' | 'space-between' | undefined =
		undefined;
</script>

<div
	style:flex-direction={direction}
	style:gap={spacing && spacingVar(spacing)}
	style:align-items={align}
	style:justify-content={justify}
>
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-small);
	}
</style>
