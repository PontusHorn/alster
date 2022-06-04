<button on:click><slot /></button>

<style>
	button {
		padding: var(--spacing-small);
		border: none;
		border-radius: var(--borderRadius-medium);
		background-color: var(--color-flavorBackground);
		color: var(--color-primaryForeground);
		font-weight: 500;
		line-height: 1;
		text-align: center;
		cursor: pointer;
	}
</style>
