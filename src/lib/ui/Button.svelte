<button on:click><slot /></button>

<style>
	button {
		padding: var(--spacingSmall);
		border: none;
		border-radius: var(--borderRadius);
		background-color: var(--flavorBackground);
		color: var(--primaryForeground);
		font-size: var(--fontSizeSmall);
		font-weight: 500;
		line-height: 1;
		text-align: center;
		cursor: pointer;
	}
</style>
