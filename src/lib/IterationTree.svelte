<script lang="ts">
	import { iterations, baseConfig, shapes } from '$lib/stores/currentWork';
	import { editedItem } from '$lib/stores/ui';
	import type { Iteration, Shape } from '$lib/types';
	import Binding from '$lib/ui/Binding.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Icon from '$lib/ui/Icon.svelte';
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
			$baseConfig.iterationIds = without($baseConfig.iterationIds, id);
		} else {
			const parentIndex = $iterations.indexOf(parent);
			$iterations[parentIndex].iterationIds = without(parent.iterationIds, id);
		}
		$iterations = deleteUnreferencedIterations($baseConfig.iterationIds, $iterations);
		$shapes = deleteUnreferencedShapes($iterations, $shapes);
	}

	function deleteShape(id: Shape['id']): void {
		$iterations[iterationIndex].shapeIds = without(iteration.shapeIds, id);
		$shapes = deleteUnreferencedShapes($iterations, $shapes);
	}
</script>

{#if iteration}
	{@const expanded = $editedItem?.type === 'iteration' && $editedItem.id === iteration.id}
	<div class="iteration">
		<span class="summary"
			>Create {iteration.end - iteration.start} <Binding>{iteration.name}</Binding></span
		>
		<span class="actions">
			<Stack direction="row" justify="end" spacing="tiny">
				<Button
					icon
					variant="ghost"
					aria-label="Edit {iteration.name}"
					on:click={() => editedItem.set(expanded ? undefined : iteration)}
					aria-controls={getEditIterationId(iteration.id)}
					aria-expanded={expanded}
				>
					<Icon icon="Edit" />
				</Button>
				<Button
					icon
					variant="ghost"
					aria-label="Delete {iteration.name}"
					on:click={() => deleteIteration(iteration.id)}
				>
					<Icon icon="Delete" />
				</Button>
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
							<Stack direction="row" justify="space-between">
								<span>Draw {shapeArticle(shape)} <b>{shape.shapeType}</b></span>
								<span class="actions">
									<Stack direction="row" justify="end" spacing="tiny">
										<Button
											icon
											variant="ghost"
											aria-label="Edit {shape.shapeType}"
											on:click={() => editedItem.set(expanded ? undefined : shape)}
											aria-controls={getEditShapeId(shape.id)}
											aria-expanded={expanded}
										>
											<Icon icon="Edit" />
										</Button>
										<Button
											icon
											variant="ghost"
											aria-label="Delete {shape.shapeType}"
											on:click={() => deleteShape(shape.id)}
										>
											<Icon icon="Delete" />
										</Button>
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
		gap: var(--spacing-small);
		justify-content: space-between;
	}

	.summary {
		grid-area: summary;
	}

	.actions {
		grid-area: actions;
		padding-inline-end: var(--spacing-small);
	}

	.stepsLabel {
		grid-area: stepsLabel;
	}

	.steps {
		grid-area: steps;
	}
</style>
