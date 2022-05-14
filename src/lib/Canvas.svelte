<script lang="ts">
	import { evaluate, randomColor } from '$lib/expression';
	import type { Bindings, Config, Pattern, Shape } from '$lib/types';

	export let config: Config;

	type Ctx = CanvasRenderingContext2D;

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

	function drawPattern(ctx: Ctx, bindings: Bindings, pattern: Pattern) {
		const { start, end, each } = pattern;
		const name = 'i';
		for (bindings[name] = start; bindings[name] < end; bindings[name]++) {
			if (each.shape) {
				drawShape(ctx, bindings, each.shape);
			}
		}
	}

	function drawShape(ctx: Ctx, bindings: Bindings, shape: Shape) {
		switch (shape.type) {
			case 'rectangle':
				return drawRectangle(ctx, bindings, shape);
		}
	}

	function drawRectangle(ctx: Ctx, bindings: Bindings, shape: Shape) {
		const x = evaluate(shape.x, bindings);
		const y = evaluate(shape.y, bindings);
		const width = evaluate(shape.width, bindings);
		const height = evaluate(shape.height, bindings);
		ctx.fillStyle = shape.color === 'random' ? randomColor() : shape.color;
		ctx.fillRect(x, y, width, height);
	}
</script>

<canvas width="800" height="600" bind:this={canvas} />

<style>
	canvas {
		width: 800px;
		height: 600px;
	}
</style>
