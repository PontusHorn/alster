<script lang="ts">
	import type { Shape } from '$lib/types';
	import RectangleInput from '$lib/RectangleInput.svelte';

	export let shape: Shape;
</script>

{#if shape.type === 'rectangle'}
	<RectangleInput bind:shape />
{:else}
	Invalid shape
{/if}
