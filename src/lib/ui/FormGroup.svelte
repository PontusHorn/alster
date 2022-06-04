<script lang="ts">
	import Stack from '$lib/ui/Stack.svelte';

	export let id: string | undefined = undefined;
	export let title: string;
	export let hidden: boolean = false;
</script>

<div class="wrapper" {id} {hidden}>
	<Stack direction="row" spacing="medium">
		<h2>{title}</h2>
		<div class="inner">
			<slot />
		</div>
	</Stack>
</div>

<style>
	.wrapper {
		padding: var(--spacing-medium);
	}

	h2 {
		border-right: var(--borderWidth-thick) solid var(--color-complementary);
		padding-right: var(--spacing-small);
	}
</style>
