<script lang="ts">
	import IterationInput from '$lib/IterationInput.svelte';
	import IterationTree from '$lib/IterationTree.svelte';
	import ShapeInput from '$lib/ShapeInput.svelte';
	import { editedItem, iterations, rootConfig, shapes } from '$lib/stores';
	import FormGroup from '$lib/ui/FormGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import Step from '$lib/ui/Step.svelte';
	import Steps from '$lib/ui/Steps.svelte';
	import { getEditIterationId, getEditShapeId, getIteration, getShape } from '$lib/utils/config';
</script>

<Stack --direction="row" --spacing="var(--spacingMedium)">
	<FormGroup title="Steps">
		<Steps>
			{#each $rootConfig.iterationIds as iterationId}
				<Step><IterationTree iteration={getIteration($iterations, iterationId)} /></Step>
			{/each}
		</Steps>
	</FormGroup>

	{#each $iterations as iteration}
		<FormGroup
			id={getEditIterationId(iteration.id)}
			title="Edit {iteration.name}"
			hidden={$editedItem?.type !== 'iteration' || $editedItem.id !== iteration.id}
		>
			<IterationInput {iteration} />
		</FormGroup>
	{/each}

	{#each $shapes as shape}
		<FormGroup
			id={getEditShapeId(shape.id)}
			title="Edit {shape.shapeType}"
			hidden={$editedItem?.type !== 'shape' || $editedItem.id !== shape.id}
		>
			<ShapeInput {shape} />
		</FormGroup>
	{/each}
</Stack>
