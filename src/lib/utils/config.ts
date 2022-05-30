import type { Iteration, Shape } from '$lib/types';

export function getIteration(iterations: Iteration[], id: string): Iteration {
	const iteration = iterations.find((iteration) => iteration.id === id);
	if (!iteration) {
		throw new Error(`No iteration with id ${id}`);
	}
	return iteration;
}

export function deleteUnreferencedIterations(
	rootIterationIds: Iteration['id'][],
	iterations: Iteration[]
): Iteration[] {
	let remainingIterations = [...iterations];
	let referencedIterations = getReferencedIterations(rootIterationIds, remainingIterations);
	while (referencedIterations.length < remainingIterations.length) {
		remainingIterations = referencedIterations;
		referencedIterations = getReferencedIterations(rootIterationIds, remainingIterations);
	}
	return remainingIterations;
}

function getReferencedIterations(
	rootIterationIds: Iteration['id'][],
	iterations: Iteration[]
): Iteration[] {
	return iterations.filter(
		(iteration) =>
			rootIterationIds.includes(iteration.id) ||
			iterations.some(({ iterationIds }) => iterationIds.includes(iteration.id))
	);
}

export function deleteUnreferencedShapes(iterations: Iteration[], shapes: Shape[]): Shape[] {
	let remainingShapes = [...shapes];
	let referencedShapes = getReferencedShapes(iterations, remainingShapes);
	while (referencedShapes.length < remainingShapes.length) {
		remainingShapes = referencedShapes;
		referencedShapes = getReferencedShapes(iterations, remainingShapes);
	}
	return remainingShapes;
}

function getReferencedShapes(iterations: Iteration[], shapes: Shape[]): Shape[] {
	return shapes.filter((shape) => iterations.some(({ shapeIds }) => shapeIds.includes(shape.id)));
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
