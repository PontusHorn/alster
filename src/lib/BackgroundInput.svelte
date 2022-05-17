<script lang="ts">
	import ColorInput from '$lib/ColorInput.svelte';
	import FormGroup from '$lib/FormGroup.svelte';
	import type { Color } from '$lib/types';

	export let background: Color;
</script>

<FormGroup title="Background" open>
	<ColorInput bind:color={background} />
</FormGroup>
