import { evaluate } from '$lib/expression';
import type { Bindings, Pattern, Shape } from '$lib/types';

type Ctx = CanvasRenderingContext2D;

export function drawPattern(ctx: Ctx, bindings: Bindings, pattern: Pattern) {
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

export function isShapeType(type: unknown): type is Shape['type'] {
	return type === 'rectangle';
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
