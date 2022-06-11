<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { ExpressionInput } from '$lib/ui/Expression';
	import type { NumberedColor } from '$lib/types';

	const index = counter++;

	export let color: NumberedColor;
	export let subjectName: string | undefined = undefined;
</script>

<label for="NumberedColorInput-value-{index}">Value:</label>
<ExpressionInput
	id="NumberedColorInput-value-{index}"
	bind:expression={color.value}
	editTitle={`Edit ${subjectName ? `${subjectName} ` : ''} color determinant`}
>
	<p slot="editDescription">
		The value specified here has no meaning of its own except to identify a color. The color
		associated with any given number is random, but stays stable throughout the session.
	</p>
</ExpressionInput>
