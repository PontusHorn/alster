<script lang="ts">
	import { op, ref, val } from '$lib/expression';
	import Canvas from '$lib/Canvas.svelte';
	import type { Color, Config, Pattern } from '$lib/types';
	import PatternInput from '$lib/PatternInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';

	let background: Color = { type: 'rgb', red: [val(255)], green: [val(255)], blue: [val(255)] };
	let pattern: Pattern = {
		start: 0,
		end: 100,
		each: {
			shape: {
				type: 'rectangle',
				color: {
					type: 'hsl',
					hue: [ref('i'), op('*'), val(10), op('-'), ref('time'), op('*'), val(0.05)],
					saturation: [val(70)],
					lightness: [val(50)]
				},
				x: [ref('i'), op('*'), val(7)],
				y: [ref('i'), op('*'), val(6)],
				width: [val(100)],
				height: [val(6)]
			}
		}
	};

	let config: Config;
	$: config = { background, pattern };
</script>

<FormGrid>
	<label for="background">Background:</label>
	<input id="background" type="color" bind:value={background} />
</FormGrid>

<PatternInput bind:pattern />

<Canvas {config} />
