<script lang="ts">
	import { iterations, rootConfig, shapes } from '$lib/stores/config';
	import { editedItem } from '$lib/stores/ui';
	import type { Iteration, Shape } from '$lib/types';
	import Binding from '$lib/ui/Binding.svelte';
	import IconButton from '$lib/ui/IconButton.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import Step from '$lib/ui/Step.svelte';
	import Steps from '$lib/ui/Steps.svelte';
	import {
		deleteUnreferencedIterations,
		deleteUnreferencedShapes,
		getEditIterationId,
		getEditShapeId,
		getShape
	} from '$lib/utils/config';
	import { without } from '$lib/utils/generic';

	export let parent: 'root' | Iteration;
	export let iterationId: Iteration['id'];
	$: iterationIndex = $iterations.findIndex(({ id }) => id === iterationId);
	$: iteration = $iterations[iterationIndex];

	function shapeArticle(shape: Shape): string {
		switch (shape.shapeType) {
			case 'rectangle':
				return 'a';
			case 'ellipse':
				return 'an';
		}
	}

	function deleteIteration(id: Iteration['id']): void {
		if (parent === 'root') {
			$rootConfig.iterationIds = without($rootConfig.iterationIds, id);
		} else {
			const parentIndex = $iterations.indexOf(parent);
			$iterations[parentIndex].iterationIds = without(parent.iterationIds, id);
		}
		$iterations = deleteUnreferencedIterations($rootConfig.iterationIds, $iterations);
		$shapes = deleteUnreferencedShapes($iterations, $shapes);
	}

	function deleteShape(id: Shape['id']): void {
		$iterations[iterationIndex].shapeIds = without(iteration.shapeIds, id);
		$shapes = deleteUnreferencedShapes($iterations, $shapes);
	}
</script>

{#if iteration}
	<div class="iteration">
		<span class="summary"
			>Create {iteration.end - iteration.start} <Binding>{iteration.name}</Binding></span
		>
		<span class="actions">
			<Stack --direction="row" --justify="end" --spacing="var(--spacingTiny)">
				<IconButton
					icon="Edit"
					label="Edit {iteration.name}"
					on:click={() => editedItem.set(iteration)}
					controls={getEditIterationId(iteration.id)}
					expanded={$editedItem?.type === 'iteration' && $editedItem.id === iteration.id}
				/>
				<IconButton
					icon="Delete"
					label="Delete {iteration.name}"
					on:click={() => deleteIteration(iteration.id)}
				/>
			</Stack>
		</span>

		{#if iteration.iterationIds.length || iteration.shapeIds.length}
			<span class="stepsLabel">For each {iteration.name}:</span>
			<div class="steps">
				<Steps>
					{#each iteration.iterationIds as iterationId}
						<Step><svelte:self parent={iteration} {iterationId} /></Step>
					{/each}
					{#each iteration.shapeIds as shapeId}
						{@const shape = getShape($shapes, shapeId)}
						{@const expanded = $editedItem?.type === 'shape' && $editedItem.id === shape.id}
						<Step>
							<Stack --direction="row" --justify="space-between">
								<span>Draw {shapeArticle(shape)} <b>{shape.shapeType}</b></span>
								<span class="actions">
									<Stack --justify="end" --spacing="var(--spacingTiny)">
										<IconButton
											icon="Edit"
											label="Edit {shape.shapeType}"
											on:click={() => editedItem.set(expanded ? undefined : shape)}
											controls={getEditShapeId(shape.id)}
											{expanded}
										/>
										<IconButton
											icon="Delete"
											label="Delete {shape.shapeType}"
											on:click={() => deleteShape(shape.id)}
										/>
									</Stack>
								</span>
							</Stack>
						</Step>
					{/each}
				</Steps>
			</div>
		{/if}
	</div>
{/if}

<style>
	.iteration {
		display: grid;
		grid-template-areas:
			'summary actions'
			'stepsLabel actions'
			'steps steps';
		grid-template-columns: 1fr auto;
		gap: var(--spacingSmall);
		justify-content: space-between;
	}

	.summary {
		grid-area: summary;
	}

	.actions {
		grid-area: actions;
		padding-inline-end: var(--spacingSmall);
	}

	.stepsLabel {
		grid-area: stepsLabel;
	}

	.steps {
		grid-area: steps;
	}
</style>
