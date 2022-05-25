<script lang="ts">
	import Stack from '$lib/ui/Stack.svelte';

	export let id: string | undefined = undefined;
	export let title: string;
	export let hidden: boolean = false;
</script>

<div {id} {hidden}>
	<Stack --direction="column" --spacing="var(--spacingSmall)">
		<h3>{title}</h3>
		<div class="inner">
			<slot />
		</div>
	</Stack>
</div>

<style>
	h3 {
		background-color: var(--flavorBackground);
		border-radius: var(--borderRadius);
		line-height: 1;
		padding: var(--spacingSmall);
	}
</style>
