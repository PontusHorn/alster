<script lang="ts">
	import { editedItem, iterations, shapes } from '$lib/stores';
	import type { Iteration, Shape } from '$lib/types';
	import Binding from '$lib/ui/Binding.svelte';
	import IconButton from '$lib/ui/IconButton.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import Step from '$lib/ui/Step.svelte';
	import Steps from '$lib/ui/Steps.svelte';
	import { getEditIterationId, getEditShapeId, getIteration, getShape } from '$lib/utils/config';

	export let iteration: Iteration;

	function shapeArticle(shape: Shape): string {
		switch (shape.shapeType) {
			case 'rectangle':
				return 'a';
			case 'ellipse':
				return 'an';
		}
	}
</script>

<div class="iteration">
	<span class="summary"
		>Create {iteration.end - iteration.start} <Binding>{iteration.name}</Binding></span
	>
	<span class="edit">
		<IconButton
			icon="Edit"
			label="Edit {iteration.name}"
			on:click={() => editedItem.set(iteration)}
			controls={getEditIterationId(iteration.id)}
			expanded={$editedItem?.type === 'iteration' && $editedItem.id === iteration.id}
		/>
	</span>

	<span class="stepsLabel">For each {iteration.name}:</span>
	<div class="steps">
		<Steps>
			{#each iteration.iterationIds as iterationId}
				<Step><svelte:self iteration={getIteration($iterations, iterationId)} /></Step>
			{/each}
			{#each iteration.shapeIds as shapeId}
				{@const shape = getShape($shapes, shapeId)}
				{@const expanded = $editedItem?.type === 'shape' && $editedItem.id === shape.id}
				<Step>
					<Stack --direction="row" --justify="space-between">
						<span>Draw {shapeArticle(shape)} <b>{shape.shapeType}</b></span>
						<span class="edit">
							<IconButton
								icon="Edit"
								label="Edit {shape.shapeType}"
								on:click={() => editedItem.set(expanded ? undefined : shape)}
								controls={getEditShapeId(shape.id)}
								{expanded}
							/>
						</span>
					</Stack>
				</Step>
			{/each}
		</Steps>
	</div>
</div>

<style>
	.iteration {
		display: grid;
		grid-template-areas:
			'summary edit'
			'stepsLabel edit'
			'steps steps';
		grid-template-columns: 1fr auto;
		gap: var(--spacingSmall);
		justify-content: space-between;
	}

	.summary {
		grid-area: summary;
	}

	.edit {
		grid-area: edit;
		padding-inline-end: var(--spacingSmall);
	}

	.stepsLabel {
		grid-area: stepsLabel;
	}

	.steps {
		grid-area: steps;
	}
</style>
