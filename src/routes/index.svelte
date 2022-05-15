<script lang="ts">
	import { op, ref, val } from '$lib/expression';
	import Canvas from '$lib/Canvas.svelte';
	import type { Color, Config, Pattern } from '$lib/types';
	import PatternInput from '$lib/PatternInput.svelte';
	import ColorInput from '$lib/ColorInput.svelte';
	import FormGroup from '$lib/FormGroup.svelte';

	let background: Color = { type: 'rgb', red: [val(255)], green: [val(255)], blue: [val(255)] };
	let pattern: Pattern = {
		start: 0,
		end: 100,
		each: {
			shape: {
				type: 'ellipse',
				color: {
					type: 'hsl',
					hue: [ref('i'), op('*'), val(10), op('-'), ref('time'), op('*'), val(0.05)],
					saturation: [val(70)],
					lightness: [val(50)]
				},
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
