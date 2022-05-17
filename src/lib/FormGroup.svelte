<script lang="ts">
	import Collapsible from '$lib/Collapsible.svelte';
	import Stack from '$lib/Stack.svelte';

	export let title: string;
	export let open = false;
</script>

<div>
	<Collapsible {title} {open}>
		<Stack>
			<slot />
		</Stack>
	</Collapsible>
</div>

<style>
	div {
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: 0.3rem;
		padding: 0.5rem;
	}
</style>
