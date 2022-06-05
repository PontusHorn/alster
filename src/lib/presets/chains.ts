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
	],
	shapes: [
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
	]
};

export default chainsConfig;
