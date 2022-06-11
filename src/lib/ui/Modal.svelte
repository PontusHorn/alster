<script context="module" lang="ts">
	export {
		DialogTitle as ModalTitle,
		DialogDescription as ModalDescription
	} from '@rgossiaux/svelte-headlessui';
</script>

<script lang="ts">
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	export let open = true;
	export let initialFocus: HTMLElement | null | undefined = undefined;
</script>

{#if open}
	<Dialog {open} {initialFocus} on:close static>
		<div
			class="root"
			in:fade={{ duration: 150, easing: cubicInOut }}
			out:fade={{ duration: 150, easing: cubicInOut }}
		>
			<DialogOverlay class="overlay" />
			<div
				class="dialog"
				in:fly={{ duration: 400, y: 100, easing: cubicOut }}
				out:fly={{ duration: 200, y: 100, easing: cubicIn }}
			>
				<slot />
			</div>
		</div>
	</Dialog>
{/if}

<style>
	.root > :global(.overlay) {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		inset: 0;
	}

	.dialog {
		background-color: white;
		border-radius: var(--borderRadius-medium);
		box-shadow: var(--shadow-medium);
		display: flex;
		flex-direction: column;
		left: 50%;
		max-height: calc(100vh - var(--spacing-large));
		max-width: calc(100vw - var(--spacing-large));
		min-width: 300px;
		padding: var(--spacing-medium);
		position: fixed;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
