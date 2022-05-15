import { evaluate } from '$lib/expression';
import type { Bindings, Color, Pattern, Shape } from '$lib/types';

type Ctx = CanvasRenderingContext2D;

export function drawBackground(ctx: Ctx, bindings: Bindings, color: Color) {
	ctx.fillStyle = getColor(color, bindings);
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

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
	ctx.fillStyle = getColor(shape.color, bindings);
	ctx.fillRect(x, y, width, height);
}

export function isShapeType(type: unknown): type is Shape['type'] {
	return type === 'rectangle';
}

function getColor(color: Color, bindings: Bindings): string {
	switch (color.type) {
		case 'randomColor':
			return randomColor();
		case 'hsl':
			return hsl(
				evaluate(color.hue, bindings),
				evaluate(color.saturation, bindings),
				evaluate(color.lightness, bindings)
			);
		case 'rgb':
			return rgb(
				evaluate(color.red, bindings),
				evaluate(color.green, bindings),
				evaluate(color.blue, bindings)
			);
	}
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function hsl(hue: number, saturation: number, lightness: number) {
	let adjustedHue = hue % 360;
	if (adjustedHue < 0) {
		adjustedHue += 360;
	}
	return `hsl(${adjustedHue}, ${clamp(saturation, 0, 100)}%, ${clamp(lightness, 0, 100)}%)`;
}

function rgb(red: number, green: number, blue: number) {
	return `rgb(${clamp(red, 0, 255)}, ${clamp(green, 0, 255)}, ${clamp(blue, 0, 255)})`;
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}
