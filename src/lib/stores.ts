import type { RootConfig, Iteration, Shape } from '$lib/types';
import { makeHsl, makeRgb } from '$lib/utils/drawing';
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
		name: 'chain',
		start: 0,
		end: 3,
		shapeIds: [],
		iterationIds: ['2zeea47kpam']
	},
	{
		type: 'iteration',
		id: '2zeea47kpam',
		name: 'link',
		start: 0,
		end: 120,
		shapeIds: ['9edvd4bcgd8'],
		iterationIds: []
	}
]);

export const shapes = writable<Shape[]>([
	{
		type: 'shape',
		shapeType: 'ellipse',
		id: '9edvd4bcgd8',
		color: makeHsl('$chain * 100 + $link * 122 - $time * 0.03', 80, 60),
		x: toExp(
			'($chain * ($canvasWidth + 100) / 3 + $link * 7 + $time / 10) % ($canvasWidth + 100) - 50'
		),
		y: toExp('$link * 6 - 50'),
		width: toExp(100),
		height: toExp(40),
		rotation: toExp('$link * 0.06 + $time / 1000')
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
