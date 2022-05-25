<script lang="ts">
	import { browser } from '$app/env';
	import { config, iterations, rootConfig } from '$lib/stores';
	import type { Bindings } from '$lib/types';
	import { getIteration } from '$lib/utils/config';
	import { drawBackground, drawIteration } from '$lib/utils/drawing';
	import { onDestroy, onMount } from 'svelte';

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

		const bindings: Bindings = {
			time,
			canvasWidth: $rootConfig.width,
			canvasHeight: $rootConfig.height
		};

		drawBackground(ctx, bindings, $rootConfig.background);

		for (const iterationId of $rootConfig.iterationIds) {
			const iteration = getIteration($iterations, iterationId);
			drawIteration(ctx, $config, bindings, iteration);
		}
	}
</script>

<canvas width={$rootConfig.width} height={$rootConfig.height} bind:this={canvas} />

<style>
	canvas {
		align-self: start;
	}
</style>
