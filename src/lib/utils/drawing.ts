import { evaluate, toExp, type ToExpInput } from '$lib/utils/expression';
import {
	type Bindings,
	type Ellipse,
	type Color,
	type Iteration,
	type Rectangle,
	type Shape,
	type Hsl,
	type Rgb,
	ColorType,
	type NumberedColor,
	type Config,
	type Expression
} from '$lib/types';
import { getIteration, getShape } from '$lib/utils/config';

type Ctx = CanvasRenderingContext2D;

export function drawCanvas(ctx: Ctx, config: Config, time: number): void {
	const bindings: Bindings = {
		time,
		canvasWidth: config.root.width,
		canvasHeight: config.root.height
	};

	drawBackground(ctx, bindings, config.root.background);

	for (const iterationId of config.root.iterationIds) {
		const iteration = getIteration(config.iterations, iterationId);
		drawIteration(ctx, config, bindings, iteration);
	}
}

export function drawBackground(ctx: Ctx, bindings: Bindings, color: Color) {
	ctx.fillStyle = getColor(color, bindings);
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawIteration(ctx: Ctx, config: Config, bindings: Bindings, iteration: Iteration) {
	const { name, start, end } = iteration;
	for (bindings[name] = start; bindings[name] < end; bindings[name]++) {
		for (const shapeId of iteration.shapeIds) {
			const shape = getShape(config.shapes, shapeId);
			drawShape(ctx, bindings, shape);
		}
		for (const iterationId of iteration.iterationIds) {
			const childIteration = getIteration(config.iterations, iterationId);
			drawIteration(ctx, config, bindings, childIteration);
		}
	}
}

function drawShape(ctx: Ctx, bindings: Bindings, shape: Shape) {
	switch (shape.shapeType) {
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

export function isShapeType(type: unknown): type is Shape['shapeType'] {
	return type === 'rectangle' || type === 'ellipse';
}

function getColor(color: Color, bindings: Bindings): string {
	switch (color.type) {
		case ColorType.Hex:
			return color.hex;
		case ColorType.Random:
			return randomColor();
		case ColorType.Numbered:
			return numberedColor(evaluate(color.value, bindings));
		case ColorType.Hsl:
			return stringFromHsl(
				evaluate(color.hue, bindings),
				evaluate(color.saturation, bindings),
				evaluate(color.lightness, bindings)
			);
		case ColorType.Rgb:
			return stringFromRgb(
				evaluate(color.red, bindings),
				evaluate(color.green, bindings),
				evaluate(color.blue, bindings)
			);
	}
}

export function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const numberedColors = new Map<number, string>();
export function numberedColor(n: number): string {
	const existingColor = numberedColors.get(n);
	if (existingColor) return existingColor;

	const color = randomColor();
	numberedColors.set(n, color);
	return color;
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
		case ColorType.Hex:
			return { type: ColorType.Hex, hex: '#000000' };
		case ColorType.Random:
			return { type: ColorType.Random };
		case ColorType.Numbered:
			return makeNumberedColor(0);
		case ColorType.Hsl:
			return makeHsl(0, 0, 0);
		case ColorType.Rgb:
			return makeRgb(0, 0, 0);
	}
}

export function makeNumberedColor(value: ToExpInput): NumberedColor {
	return { type: ColorType.Numbered, value: toExp(value) };
}

export function makeHsl(hue: ToExpInput, saturation: ToExpInput, lightness: ToExpInput): Hsl {
	return {
		type: ColorType.Hsl,
		hue: toExp(hue),
		saturation: toExp(saturation),
		lightness: toExp(lightness)
	};
}

export function makeRgb(red: ToExpInput, green: ToExpInput, blue: ToExpInput): Rgb {
	return {
		type: ColorType.Rgb,
		red: toExp(red),
		green: toExp(green),
		blue: toExp(blue)
	};
}

export function isColorType(type: unknown): type is Color['type'] {
	return Object.values(ColorType).includes(type as ColorType);
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

export function convertShape(shape: Shape, type: Shape['shapeType']): Shape {
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
		shapeType: 'rectangle'
	};
}

function ellipseFromShape(shape: Shape): Ellipse {
	return {
		...shape,
		shapeType: 'ellipse'
	};
}

export function mapShapeExpressions<S extends Shape>(
	shape: S,
	callback: (expression: Expression) => Expression
): S {
	switch (shape.shapeType) {
		case 'rectangle':
		case 'ellipse':
			return {
				...shape,
				color: mapColorExpressions(shape.color, callback),
				x: callback(shape.x),
				y: callback(shape.y),
				width: callback(shape.width),
				height: callback(shape.height),
				rotation: callback(shape.rotation)
			};
	}
}

export function getShapeExpressions(shape: Shape): Expression[] {
	switch (shape.shapeType) {
		case 'rectangle':
		case 'ellipse':
			return [
				...getColorExpressions(shape.color),
				shape.x,
				shape.y,
				shape.width,
				shape.height,
				shape.rotation
			];
	}
}

export function mapColorExpressions<C extends Color>(
	color: C,
	callback: (expression: Expression) => Expression
): C {
	switch (color.type) {
		case ColorType.Hex:
		case ColorType.Random:
			return color;
		case ColorType.Numbered:
			return { ...color, value: callback(color.value) };
		case ColorType.Hsl:
			return {
				...color,
				hue: callback(color.hue),
				saturation: callback(color.saturation),
				lightness: callback(color.lightness)
			};
		case ColorType.Rgb:
			return {
				...color,
				red: callback(color.red),
				green: callback(color.green),
				blue: callback(color.blue)
			};
	}
}

export function getColorExpressions(color: Color): Expression[] {
	switch (color.type) {
		case ColorType.Hex:
		case ColorType.Random:
			return [];
		case ColorType.Numbered:
			return [color.value];
		case ColorType.Hsl:
			return [color.hue, color.saturation, color.lightness];
		case ColorType.Rgb:
			return [color.red, color.green, color.blue];
	}
}
