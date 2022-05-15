import { evaluate, val } from '$lib/expression';
import type { Bindings, Ellipse, Color, Pattern, Rectangle, Shape, Hsl, Rgb } from '$lib/types';

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
		case 'ellipse':
			return drawEllipse(ctx, bindings, shape);
	}
}

function drawRectangle(ctx: Ctx, bindings: Bindings, shape: Rectangle) {
	const x = evaluate(shape.x, bindings);
	const y = evaluate(shape.y, bindings);
	const width = evaluate(shape.width, bindings);
	const height = evaluate(shape.height, bindings);
	const rotation = evaluate(shape.rotation, bindings);

	rotateAroundPoint(ctx, x, y, rotation);
	ctx.fillStyle = getColor(shape.color, bindings);
	ctx.fillRect(x - width / 2, y - height / 2, width, height);
	resetTransform(ctx);
}

function drawEllipse(ctx: Ctx, bindings: Bindings, shape: Ellipse) {
	const x = evaluate(shape.x, bindings);
	const y = evaluate(shape.y, bindings);
	const width = evaluate(shape.width, bindings);
	const height = evaluate(shape.height, bindings);
	const rotation = evaluate(shape.rotation, bindings);

	ctx.beginPath();
	ctx.ellipse(x, y, width / 2, height / 2, rotation, 0, 2 * Math.PI);
	ctx.fillStyle = getColor(shape.color, bindings);
	ctx.fill();
}

function rotateAroundPoint(ctx: Ctx, x: number, y: number, angle: number) {
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.translate(-x, -y);
}

function resetTransform(ctx: Ctx) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function isShapeType(type: unknown): type is Shape['type'] {
	return type === 'rectangle' || type === 'ellipse';
}

function getColor(color: Color, bindings: Bindings): string {
	switch (color.type) {
		case 'randomColor':
			return randomColor();
		case 'hsl':
			return stringFromHsl(
				evaluate(color.hue, bindings),
				evaluate(color.saturation, bindings),
				evaluate(color.lightness, bindings)
			);
		case 'rgb':
			return stringFromRgb(
				evaluate(color.red, bindings),
				evaluate(color.green, bindings),
				evaluate(color.blue, bindings)
			);
	}
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function stringFromHsl(hue: number, saturation: number, lightness: number) {
	let adjustedHue = hue % 360;
	if (adjustedHue < 0) {
		adjustedHue += 360;
	}
	return `hsl(${adjustedHue}, ${clamp(saturation, 0, 100)}%, ${clamp(lightness, 0, 100)}%)`;
}

function stringFromRgb(red: number, green: number, blue: number) {
	return `rgb(${clamp(red, 0, 255)}, ${clamp(green, 0, 255)}, ${clamp(blue, 0, 255)})`;
}

export function makeColor(type: Color['type']): Color {
	switch (type) {
		case 'randomColor':
			return { type: 'randomColor' };
		case 'hsl':
			return makeHsl(0, 0, 0);
		case 'rgb':
			return makeRgb(0, 0, 0);
	}
}

function makeHsl(hue: number, saturation: number, lightness: number): Hsl {
	return {
		type: 'hsl',
		hue: [val(hue)],
		saturation: [val(saturation)],
		lightness: [val(lightness)]
	};
}

function makeRgb(red: number, green: number, blue: number): Rgb {
	return {
		type: 'rgb',
		red: [val(red)],
		green: [val(green)],
		blue: [val(blue)]
	};
}

export function isColorType(type: unknown): type is Color['type'] {
	return type === 'randomColor' || type === 'hsl' || type === 'rgb';
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

export function convertShape(shape: Shape, type: Shape['type']): Shape {
	switch (type) {
		case 'rectangle':
			return rectangleFromShape(shape);
		case 'ellipse':
			return ellipseFromShape(shape);
	}
}

function rectangleFromShape(shape: Shape): Rectangle {
	return {
		...shape,
		type: 'rectangle'
	};
}

function ellipseFromShape(shape: Shape): Ellipse {
	return {
		...shape,
		type: 'ellipse'
	};
}
