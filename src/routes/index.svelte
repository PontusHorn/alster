<script lang="ts">
	import BackgroundInput from '$lib/BackgroundInput.svelte';
	import Canvas from '$lib/Canvas.svelte';
	import ConfigGrid from '$lib/ConfigGrid.svelte';
	import { makeHsl, makeRgb } from '$lib/drawing';
	import { toExp } from '$lib/expression';
	import PatternInput from '$lib/PatternInput.svelte';
	import type { Color, Config, Pattern } from '$lib/types';

	let background: Color = makeRgb(238, 227, 185);
	let pattern: Pattern = {
		start: 0,
		end: 120,
		each: {
			shape: {
				type: 'ellipse',
				color: makeHsl('$i * 122 - $time * 0.03', 80, 60),
				x: toExp('($time / 10 + $i * 7) % 900 - 50'),
				y: toExp('$i * 6 - 50'),
				width: toExp(100),
				height: toExp(40),
				rotation: toExp('$i * 0.06 + $time / 1000')
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
