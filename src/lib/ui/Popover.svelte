<script lang="ts">
	import Button from '$lib/ui/Button.svelte';
	import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';
	import { fly } from 'svelte/transition';

	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	const offset = 'calc(100% + var(--spacing-small))';
</script>

<div class="wrapper">
	<Popover let:open>
		<Button {...$$restProps} component={PopoverButton}>
			<slot name="button" />
		</Button>
		{#if open}
			<div
				class="panel"
				style:top={position === 'top' ? 'auto' : position === 'bottom' ? offset : '50%'}
				style:bottom={position === 'top' ? offset : 'auto'}
				style:left={position === 'left' ? 'auto' : position === 'right' ? offset : '50%'}
				style:right={position === 'left' ? offset : 'auto'}
				style:transform={position === 'top' || position === 'bottom'
					? 'translateX(-50%)'
					: 'translateY(-50%)'}
				transition:fly={{
					x: position === 'left' ? -3 : position === 'right' ? 3 : 0,
					y: position === 'top' ? -3 : position === 'bottom' ? 3 : 0
				}}
			>
				<PopoverPanel static>
					<slot name="panel" />
				</PopoverPanel>
			</div>
		{/if}
	</Popover>
</div>

<style>
	.wrapper {
		position: relative;
	}

	.panel {
		position: absolute;
		background-color: var(--color-neutralBackground);
		border-radius: var(--borderRadius-medium);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
</style>
