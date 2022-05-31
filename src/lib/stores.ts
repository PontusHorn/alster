import type { RootConfig, Iteration, Shape } from '$lib/types';
import { makeNumberedColor, makeRgb } from '$lib/utils/drawing';
import { toExp } from '$lib/utils/expression';
import { derived, writable } from 'svelte/store';

export const rootConfig = writable<RootConfig>({
	background: makeRgb(238, 227, 185),
	width: 800,
	height: 600,
	iterationIds: ['yy35ijzr458']
});

export const iterations = writable<Iteration[]>([
	{
		type: 'iteration',
		id: 'yy35ijzr458',
		name: 'row',
		start: 0,
		end: 12,
		shapeIds: [],
		iterationIds: ['2zeea47kpam']
	},
	{
		type: 'iteration',
		id: '2zeea47kpam',
		name: 'column',
		start: 0,
		end: 16,
		shapeIds: ['9edvd4bcgd8', 'pvnkcnc4bm'],
		iterationIds: []
	}
]);

export const shapes = writable<Shape[]>([
	{
		type: 'shape',
		shapeType: 'rectangle',
		id: '9edvd4bcgd8',
		color: makeNumberedColor('$row * 12 + $column'),
		x: toExp('$column * 50 + 25'),
		y: toExp('$row * 50 + 25'),
		width: toExp(50),
		height: toExp(50),
		rotation: toExp(0)
	},
	{
		type: 'shape',
		shapeType: 'ellipse',
		id: 'pvnkcnc4bm',
		color: makeNumberedColor('16 * 12 + $row * 12 + $column'),
		x: toExp('$column * 50 + 25'),
		y: toExp('$row * 50 + 25'),
		width: toExp(40),
		height: toExp(20),
		rotation: toExp('$column * 10 + $row * 10')
	}
]);

export const config = derived(
	[rootConfig, iterations, shapes],
	([$rootConfig, $iterations, $shapes]) => ({
		root: $rootConfig,
		iterations: $iterations,
		shapes: $shapes
	})
);

export type EditedItem = {
	type: (Iteration | Shape)['type'];
	id: string;
};
export const editedItem = writable<EditedItem | undefined>(undefined);
