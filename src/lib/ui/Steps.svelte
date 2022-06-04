<ul>
	<slot />
</ul>

<style>
	ul {
		margin: 0;
		padding-block: var(--spacing-small);
		padding-inline: var(--spacing-medium) 0;
		list-style: none;
		background-color: var(--color-neutralBackgroundCompounding);
		border-radius: var(--borderRadius-large);
		border-start-end-radius: var(--steps-inlineEndBorderRadius, var(--borderRadius-large));
		border-end-end-radius: var(--steps-inlineEndBorderRadius, var(--borderRadius-large));
		border: var(--borderWidth-thick) solid transparent;
		border-inline-start-color: var(--color-secondaryForeground);
		border-inline-end-width: 0;
	}

	ul > :global(*) {
		/* Tweak the border-radius for nested <Steps> components */
		--steps-inlineEndBorderRadius: 0;
	}

	ul:not(:first-child) {
		margin-block-start: var(--spacing-small);
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}
</style>
