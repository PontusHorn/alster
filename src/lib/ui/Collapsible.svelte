<script lang="ts">
	export let title: string;
	export let open = false;
</script>

<details {open}>
	<summary>{title}</summary>
	<slot />
</details>

<style>
	details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	details summary {
		cursor: pointer;
		font-size: 1.3rem;
		font-weight: bold;
		padding: 0 0.3rem;
	}

	details[open] > summary {
		margin-bottom: 0.5rem;
	}

	details details summary {
		font-size: 1.1rem;
	}

	details details details summary {
		font-size: 1rem;
	}
</style>
