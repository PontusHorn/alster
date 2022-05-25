<ul>
	<slot />
</ul>

<style>
	ul {
		margin: 0;
		padding-block: var(--spacingSmall);
		padding-inline: var(--spacingMedium) 0;
		list-style: none;
		background-color: var(--neutralBackgroundCompounding);
		border-radius: var(--borderRadiusLarge);
		border-start-end-radius: var(--steps-inlineEndBorderRadius, var(--borderRadiusLarge));
		border-end-end-radius: var(--steps-inlineEndBorderRadius, var(--borderRadiusLarge));
		border: var(--borderWidthThick) solid transparent;
		border-inline-start-color: var(--secondaryForeground);
		border-inline-end-width: 0;
	}

	ul > :global(*) {
		/* Tweak the border-radius for nested <Steps> components */
		--steps-inlineEndBorderRadius: 0;
	}

	ul:not(:first-child) {
		margin-block-start: var(--spacingSmall);
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}
</style>
