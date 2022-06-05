<script lang="ts">
	import Canvas from '$lib/Canvas.svelte';
	import CanvasInput from '$lib/CanvasInput.svelte';
	import IterationsPanel from '$lib/IterationsPanel.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '$lib/ui/Tabs';
	import WorkPanel from '$lib/WorkPanel.svelte';
</script>

<svelte:head>
	<title>Alster</title>
</svelte:head>

<Stack>
	<TabGroup>
		<TabList>
			<Tab>Canvas</Tab>
			<Tab>Content</Tab>
			<Tab>Your work</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>
				<CanvasInput />
			</TabPanel>
			<TabPanel>
				<IterationsPanel />
			</TabPanel>
			<TabPanel>
				<WorkPanel />
			</TabPanel>
		</TabPanels>
	</TabGroup>

	<Canvas />
</Stack>
