<script lang="ts">
	import type { Expression } from '$lib/types';
	import Button from '$lib/ui/Button.svelte';
	import Modal, { ModalDescription, ModalTitle } from '$lib/ui/Modal.svelte';
	import { ExpressionRawInput, ExpressionVisualInput } from '$lib/ui/Expression';
	import Stack from '$lib/ui/Stack.svelte';
	import Icon from '$lib/ui/Icon.svelte';

	export let id: string;
	export let expression: Expression;
	export let editTitle = 'Edit expression';

	let isEditing = false;
</script>

<Stack direction="row">
	<ExpressionRawInput {id} bind:expression />
	<Button icon variant="ghost" on:click={() => (isEditing = true)} aria-label={editTitle}>
		<Icon icon="Edit" />
	</Button>
</Stack>

<Modal open={isEditing} on:close={() => (isEditing = false)}>
	<Stack>
		<ModalTitle>{editTitle}</ModalTitle>
		<ModalDescription>
			<Stack>
				<slot name="editDescription" />
				<p>Click any part of the expression to learn more about it or edit it.</p>
			</Stack>
		</ModalDescription>
		<ExpressionVisualInput bind:expression />
		<Stack direction="row" justify="center" spacing="tiny">
			<Button on:click={() => (isEditing = false)}>Close</Button>
		</Stack>
	</Stack>
</Modal>
