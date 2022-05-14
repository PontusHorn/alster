<script lang="ts">
	import { drawPattern } from '$lib/drawing';
	import type { Bindings, Config } from '$lib/types';

	export let config: Config;

	let canvas: HTMLCanvasElement;
	$: ctx = canvas?.getContext('2d');
	$: if (ctx) {
		ctx.fillStyle = config.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const bindings: Bindings = {};

		if (config.pattern) {
			drawPattern(ctx, bindings, config.pattern);
		}
	}
</script>

<canvas width="800" height="600" bind:this={canvas} />

<style>
	canvas {
		width: 800px;
		height: 600px;
	}
</style>
