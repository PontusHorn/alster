<script lang="ts">
	import { op, ref, val } from '$lib/expression';
	import Canvas from '$lib/Canvas.svelte';
	import type { Config } from '$lib/types';

	const config: Config = {
		background: '#ffffff',
		pattern: {
			start: 0,
			end: 10,
			each: {
				shape: {
					type: 'rectangle',
					color: 'random',
					x: [ref('i'), op('*'), val(10)],
					y: [ref('i'), op('*'), val(10)],
					width: [val(30)],
					height: [val(30)]
				}
			}
		}
	};
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
