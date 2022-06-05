<script lang="ts">
	import Stack from '$lib/ui/Stack.svelte';

	export let id: string | undefined = undefined;
	export let title: string;
	export let hidden: boolean = false;
</script>

<div class="wrapper" {id} {hidden}>
	<h2>{title}</h2>
	<div class="inner">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
		padding: var(--spacing-medium);
	}

	h2 {
		--border: var(--borderWidth-thick) solid var(--color-complementary);
		--spacing: var(--spacing-small);
		border-block-end: var(--border);
		padding-block-end: var(--spacing-small);
	}

	@media (min-width: 768px) {
		.wrapper {
			flex-direction: row;
		}

		h2 {
			border-block-end: none;
			padding-block-end: 0;
			border-inline-end: var(--border);
			padding-inline-end: var(--spacing-small);
		}
	}
</style>
