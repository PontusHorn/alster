import type { WorkConfig } from '$lib/types';
import { makeNumberedColor, makeRgb } from '$lib/utils/drawing';
import { toExp } from '$lib/utils/expression';

const gridConfig: WorkConfig = {
	meta: {
		id: '3at9gp7op1',
		name: 'Grid'
	},
	base: {
		background: makeRgb(238, 227, 185),
		width: 800,
		height: 600,
		iterationIds: ['rbdvkduxhyn']
	},
	iterations: [
		{
			type: 'iteration',
			id: 'rbdvkduxhyn',
			name: 'row',
			start: 0,
			end: 12,
			shapeIds: [],
			iterationIds: ['22bvtlmcodb']
		},
		{
			type: 'iteration',
			id: '22bvtlmcodb',
			name: 'column',
			start: 0,
			end: 16,
			shapeIds: ['ha18zkr0d1b', 'ak605ejwe9l'],
			iterationIds: []
		}
	],
	shapes: [
		{
			type: 'shape',
			shapeType: 'rectangle',
			id: 'ha18zkr0d1b',
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
			id: 'ak605ejwe9l',
			color: makeNumberedColor('16 * 12 + $row * 12 + $column'),
			x: toExp('$column * 50 + 25'),
			y: toExp('$row * 50 + 25'),
			width: toExp(40),
			height: toExp(20),
			rotation: toExp('$column * 10 + $row * 10')
		}
	]
};

export default gridConfig;
