<script lang="ts">
	import BackgroundInput from '$lib/BackgroundInput.svelte';
	import Canvas from '$lib/Canvas.svelte';
	import ConfigGrid from '$lib/ConfigGrid.svelte';
	import { makeHsl, makeRgb } from '$lib/drawing';
	import { op, ref, val } from '$lib/expression';
	import PatternInput from '$lib/PatternInput.svelte';
	import type { Color, Config, Pattern } from '$lib/types';

	let background: Color = makeRgb(255, 255, 255);
	let pattern: Pattern = {
		start: 0,
		end: 110,
		each: {
			shape: {
				type: 'ellipse',
				color: makeHsl(
					[ref('i'), op('*'), val(122), op('-'), ref('time'), op('*'), val(0.03)],
					80,
					60
				),
				x: [ref('i'), op('*'), val(7)],
				y: [ref('i'), op('*'), val(6)],
				width: [val(100)],
				height: [val(40)],
				rotation: [ref('i'), op('*'), val(0.06), op('+'), ref('time'), op('/'), val(1000)]
			}
		}
	};

	let config: Config;
	$: config = { background, pattern };
</script>

<ConfigGrid>
	<BackgroundInput bind:background />
	<PatternInput bind:pattern />
</ConfigGrid>

<Canvas {config} />
