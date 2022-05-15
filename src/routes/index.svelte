<script lang="ts">
	import Canvas from '$lib/Canvas.svelte';
	import ColorInput from '$lib/ColorInput.svelte';
	import { makeHsl, makeRgb } from '$lib/drawing';
	import { op, ref, val } from '$lib/expression';
	import FormGroup from '$lib/FormGroup.svelte';
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

<FormGroup>
	<h2>Background</h2>
	<ColorInput bind:color={background} />
</FormGroup>

<PatternInput bind:pattern />

<Canvas {config} />
