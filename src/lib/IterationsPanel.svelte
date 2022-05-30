<script lang="ts">
	import IterationInput from '$lib/IterationInput.svelte';
	import IterationTree from '$lib/IterationTree.svelte';
	import ShapeInput from '$lib/ShapeInput.svelte';
	import { editedItem, iterations, rootConfig, shapes } from '$lib/stores';
	import type { Iteration } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import FormGroup from '$lib/ui/FormGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import Step from '$lib/ui/Step.svelte';
	import Steps from '$lib/ui/Steps.svelte';
	import { getEditIterationId, getEditShapeId } from '$lib/utils/config';
	import { randomId } from '$lib/utils/generic';

	function addIteration() {
		const childIteration: Iteration = {
			type: 'iteration',
			id: randomId(),
			name: 'iteration',
			start: 0,
			end: 10,
			shapeIds: [],
			iterationIds: []
		};

		$iterations = [...$iterations, childIteration];
		$rootConfig.iterationIds = [...$rootConfig.iterationIds, childIteration.id];
	}
</script>

<Stack --direction="row" --spacing="var(--spacingMedium)">
	<FormGroup title="Steps">
		<Stack --direction="column">
			{#if $rootConfig.iterationIds.length}
				<Steps>
					{#each $rootConfig.iterationIds as iterationId}
						<Step><IterationTree parent="root" {iterationId} /></Step>
					{/each}
				</Steps>
			{/if}

			<Button on:click={addIteration}>Add iteration</Button>
		</Stack>
	</FormGroup>

	{#each $iterations as iteration}
		<FormGroup
			id={getEditIterationId(iteration.id)}
			title="Edit {iteration.name}"
			hidden={$editedItem?.type !== 'iteration' || $editedItem.id !== iteration.id}
		>
			<IterationInput iterationId={iteration.id} />
		</FormGroup>
	{/each}

	{#each $shapes as shape}
		<FormGroup
			id={getEditShapeId(shape.id)}
			title="Edit {shape.shapeType}"
			hidden={$editedItem?.type !== 'shape' || $editedItem.id !== shape.id}
		>
			<ShapeInput bind:shape />
		</FormGroup>
	{/each}
</Stack>
