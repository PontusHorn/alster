<script lang="ts">
	import { op, ref, val } from '$lib/expression';
	import Canvas from '$lib/Canvas.svelte';
	import type { Config, Pattern } from '$lib/types';
	import PatternInput from '$lib/PatternInput.svelte';
	import FormGrid from '$lib/FormGrid.svelte';

	let background = '#ffffff';
	let pattern: Pattern = {
		start: 0,
		end: 100,
		each: {
			shape: {
				type: 'rectangle',
				color: 'random',
				x: [ref('i'), op('*'), val(10)],
				y: [ref('i'), op('*'), val(10)],
				width: [val(30)],
				height: [val(30)]
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
