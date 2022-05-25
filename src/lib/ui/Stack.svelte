<div>
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: var(--direction, column);
		gap: var(--spacing, var(--spacingSmall));
		align-items: var(--align, stretch);
		justify-content: var(--justify, normal);
	}
</style>
