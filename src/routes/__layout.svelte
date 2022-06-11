<script lang="ts">
	import { themeTag } from '$lib/design';
	import '../app.css';
</script>

<svelte:head>
	<!-- Inject theme into head. This is the only way I've found to set dynamic styles on the root
		element in a way that works on SSR. -->
	{@html themeTag}
</svelte:head>

<slot />
