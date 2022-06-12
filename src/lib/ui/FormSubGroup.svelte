<script lang="ts">
	import Stack from '$lib/ui/Stack.svelte';

	export let id: string | undefined = undefined;
	export let title: string;
	export let hidden: boolean = false;
</script>

<div {id} {hidden} class="subgroup">
	<Stack direction="column" spacing="small">
		<h3>{title}</h3>
		<div class="inner">
			<slot />
		</div>
	</Stack>
</div>

<style>
	h3 {
		line-height: 1;
		margin-block-end: var(--spacing-small);
	}
</style>
