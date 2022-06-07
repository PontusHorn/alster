<script lang="ts">
	import { browser } from '$app/env';
	import { BINDING_NAME_TIME } from '$lib/constants';
	import { config, baseConfig } from '$lib/stores/currentWork';
	import type { WorkConfig, Expression } from '$lib/types';
	import { drawCanvas, getColorExpressions, getShapeExpressions } from '$lib/utils/drawing';
	import { isExpression, isRef } from '$lib/utils/expression';
	import { onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement | undefined;
	let rafHandle: number | undefined;

	$: ctx = canvas?.getContext('2d');
	$: updateEveryFrame = configReferencesTime($config);

	$: if (ctx && updateEveryFrame && !rafHandle) {
		rafHandle = window.requestAnimationFrame(onFrame);
	}

	$: if (ctx) {
		onConfigChanged(ctx, $config);
	}

	onDestroy(() => {
		if (browser && rafHandle !== undefined) {
			window.cancelAnimationFrame(rafHandle);
		}
	});

	function onFrame(time: number) {
		rafHandle = updateEveryFrame ? window.requestAnimationFrame(onFrame) : undefined;

		// Draw the canvas on every frame if the time is referenced in the config.
		if (ctx && configReferencesTime($config)) {
			drawCanvas(ctx, $config, time);
		}
	}

	function onConfigChanged(ctx: CanvasRenderingContext2D, config: WorkConfig) {
		// If the config does *not* reference the time, we only need to update on config changes.
		if (!configReferencesTime(config)) {
			const time = 0;
			drawCanvas(ctx, config, time);
		}
	}

	function configReferencesTime(config: WorkConfig): boolean {
		const expressions = [
			...getColorExpressions(config.base.background),
			...config.shapes.flatMap(getShapeExpressions)
		];
		return expressions.some(expressionReferencesTime);
	}

	function expressionReferencesTime(expression: Expression): boolean {
		return expression.value.some(
			(part) =>
				(isExpression(part) && expressionReferencesTime(part)) ||
				(isRef(part) && part.name === BINDING_NAME_TIME)
		);
	}
</script>

<canvas width={$baseConfig.width} height={$baseConfig.height} bind:this={canvas} />

<style>
	canvas {
		align-self: start;
		max-width: 100%;
	}
</style>
