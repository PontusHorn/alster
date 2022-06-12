<script lang="ts">
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
		min-width: 30ch;
	}

	h2 {
		border-block-end: var(--borderWidth-thick) solid var(--color-complementary);
		padding-block-end: var(--spacing-small);
	}
</style>
