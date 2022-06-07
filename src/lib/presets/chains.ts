import type { WorkConfig } from '$lib/types';
import { makeHsl, makeRgb } from '$lib/utils/drawing';
import { toExp } from '$lib/utils/expression';

const chainsConfig: WorkConfig = {
	meta: {
		id: 'akqo699us4u',
		name: 'Chains'
	},
	base: {
		background: makeRgb(238, 227, 185),
		width: 800,
		height: 600,
		iterationIds: ['yy35ijzr458']
	},
	iterations: [
		{
			type: 'iteration',
			id: 'yy35ijzr458',
			name: 'Chain',
			start: 0,
			end: 3,
			shapeIds: [],
			iterationIds: ['2zeea47kpam']
		},
		{
			type: 'iteration',
			id: '2zeea47kpam',
			name: 'Link',
			start: 0,
			end: 120,
			shapeIds: ['9edvd4bcgd8'],
			iterationIds: []
		}
	],
	shapes: [
		{
			type: 'shape',
			shapeType: 'ellipse',
			id: '9edvd4bcgd8',
			color: makeHsl('[Chain] * 100 + [Link] * 122 - [Time] * 0.03', 80, 60),
			x: toExp(
				'([Chain] * ([Canvas width] + 100) / 3 + [Link] * 7 + [Time] / 10) % ([Canvas width] + 100) - 50'
			),
			y: toExp('[Link] * 6 - 50'),
			width: toExp(100),
			height: toExp(40),
			rotation: toExp('[Link] * 0.06 + [Time] / 1000')
		}
	]
};

export default chainsConfig;
