<script lang="ts">
	import Canvas from '$lib/Canvas.svelte';
	import CanvasInput from '$lib/CanvasInput.svelte';
	import IterationsPanel from '$lib/IterationsPanel.svelte';
	import Stack from '$lib/ui/Stack.svelte';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '$lib/ui/Tabs';
</script>

<svelte:head>
	<title>Alster</title>
</svelte:head>

<Stack>
	<TabGroup>
		<TabList>
			<Tab>Canvas</Tab>
			<Tab>Content</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>
				<CanvasInput />
			</TabPanel>
			<TabPanel>
				<IterationsPanel />
			</TabPanel>
		</TabPanels>
	</TabGroup>

	<Canvas />
</Stack>
