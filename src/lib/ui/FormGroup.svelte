<script lang="ts">
	import Stack from '$lib/ui/Stack.svelte';

	export let id: string | undefined = undefined;
	export let title: string;
	export let hidden: boolean = false;
</script>

<div class="wrapper" {id} {hidden}>
	<Stack --spacing="var(--spacingMedium)">
		<h2>{title}</h2>
		<div class="inner">
			<slot />
		</div>
	</Stack>
</div>

<style>
	.wrapper {
		padding: var(--spacingMedium);
	}

	h2 {
		border-right: var(--borderWidthThick) solid var(--complementaryColor);
		padding-right: var(--spacingSmall);
	}
</style>
