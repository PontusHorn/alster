<script context="module" lang="ts">
	let counter = 0;
</script>

<script lang="ts">
	import { presets } from '$lib/presets';
	import { config, iterations, baseConfig, shapes, metaConfig } from '$lib/stores/currentWork';
	import { savedWorks } from '$lib/stores/savedWorks';
	import type { WorkConfig } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import FormGrid from '$lib/ui/FormGrid.svelte';
	import FormGroup from '$lib/ui/FormGroup.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { randomId } from '$lib/utils/generic';

	const index = counter++;

	$: previousSavedWork = $savedWorks.find(({ meta }) => meta.id === $metaConfig.id);

	function saveCurrentWork({ saveAsCopy = false } = {}) {
		// Clone the config before saving so as not to mutate it after saving
		const currentWork = structuredClone($config);
		if (saveAsCopy) {
			// Assign a new id to the current work and add it to the list of saved works
			currentWork.meta.id = randomId();
			$savedWorks = [...$savedWorks, currentWork];
		} else {
			// Replace the existing saved work with the same id
			$savedWorks = $savedWorks.map((savedWork) =>
				savedWork.meta.id === currentWork.meta.id ? currentWork : savedWork
			);
		}
	}

	function loadWork(savedWork: WorkConfig) {
		// Clone the work before loading so as not to mutate it when editing
		const loadedWork = structuredClone(savedWork);
		$baseConfig = loadedWork.base;
		$metaConfig = loadedWork.meta;
		$iterations = loadedWork.iterations;
		$shapes = loadedWork.shapes;
	}

	function deleteSavedWork(workId: string) {
		$savedWorks = $savedWorks.filter(({ meta }) => meta.id !== workId);
	}
</script>

<Stack direction="row" spacing="medium" wrap>
	<FormGroup title="Current work">
		<Stack spacing="medium">
			<FormGrid>
				<label for="WorkPanel-name-{index}">Name:</label>
				<input id="WorkPanel-name-{index}" type="text" bind:value={$metaConfig.name} />
			</FormGrid>

			<Stack>
				{#if previousSavedWork}
					<Button on:click={() => saveCurrentWork()}>
						Overwrite "{previousSavedWork.meta.name}"
					</Button>
					<Button on:click={() => saveCurrentWork({ saveAsCopy: true })}>Save as copy</Button>
				{:else}
					<Button on:click={() => saveCurrentWork({ saveAsCopy: true })}>Save work</Button>
				{/if}
			</Stack>
		</Stack>
	</FormGroup>

	<FormGroup title="Your saved works">
		{#if $savedWorks.length > 0}
			<Stack as="ul">
				{#each $savedWorks as savedWork (savedWork.meta.id)}
					<Stack as="li" direction="row" spacing="medium" align="center" justify="space-between">
						{savedWork.meta.name}
						<div class="actions">
							<Button on:click={() => loadWork(savedWork)}>Load</Button>
							<Button on:click={() => deleteSavedWork(savedWork.meta.id)}>Delete</Button>
						</div>
					</Stack>
				{/each}
			</Stack>
		{:else}
			<p>Nothing saved yet.</p>
		{/if}
	</FormGroup>

	<FormGroup title="Examples">
		<Stack as="ul">
			{#each presets as preset (preset.meta.id)}
				<Stack as="li" direction="row" spacing="medium" align="center" justify="space-between">
					{preset.meta.name}
					<div class="actions">
						<Button on:click={() => loadWork(preset)}>Load</Button>
					</div>
				</Stack>
			{/each}
		</Stack>
	</FormGroup>
</Stack>

<style>
	input {
		width: 10em;
	}
</style>
