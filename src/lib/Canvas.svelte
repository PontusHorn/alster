<script lang="ts">
	import { browser } from '$app/env';
	import { drawBackground, drawPattern } from '$lib/drawing';
	import type { Bindings, Config } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';

	export let config: Config;

	let canvas: HTMLCanvasElement;
	let rafHandle: number;

	onMount(() => {
		rafHandle = window.requestAnimationFrame(draw);
	});

	onDestroy(() => {
		if (browser) {
			window.cancelAnimationFrame(rafHandle);
		}
	});

	function draw(time: number) {
		rafHandle = window.requestAnimationFrame(draw);
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const bindings: Bindings = { time, canvasWidth: config.width, canvasHeight: config.height };

		drawBackground(ctx, bindings, config.background);

		if (config.pattern) {
			drawPattern(ctx, bindings, config.pattern);
		}
	}
</script>

<canvas width={config.width} height={config.height} bind:this={canvas} />
