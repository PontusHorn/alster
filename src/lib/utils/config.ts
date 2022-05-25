import type { Iteration, Shape } from '$lib/types';

export function getIteration(iterations: Iteration[], id: string): Iteration {
	const iteration = iterations.find((iteration) => iteration.id === id);
	if (!iteration) {
		throw new Error(`No iteration with id ${id}`);
	}
	return iteration;
}

export function getEditIterationId(iterationId: string): string {
	return `edit-iteration-${iterationId}`;
}

export function getShape(shapes: Shape[], id: string): Shape {
	const shape = shapes.find((shape) => shape.id === id);
	if (!shape) {
		throw new Error(`No shape with id ${id}`);
	}
	return shape;
}

export function getEditShapeId(shapeId: string): string {
	return `edit-shape-${shapeId}`;
}
