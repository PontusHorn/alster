<script lang="ts">
	import Canvas from '$lib/Canvas.svelte';
	import type { Config } from '$lib/types';

	const config: Config = {
		background: '#ffffff'
</script>

<div>
	<label for="background">Background:</label>
	<input id="background" type="color" bind:value={config.background} />
</div>

<Canvas {config} />

<style>
	div {
		display: grid;
		font: 14px/1.5 sans-serif;
		gap: 0.5rem;
		grid-template-columns: auto 1fr;
		align-items: center;
		margin-bottom: 1rem;
	}
</style>
