<slot />

<style>
	:global(html) {
		accent-color: var(--complementaryColor);
		background: var(--flavorBackground);
		color: var(--primaryForeground);
		font: 14px/1.5 sans-serif;

		--primaryForeground: hsl(160, 100%, 5%);
		--secondaryForeground: hsl(160, 70%, 23%);
		--flavorColor: hsl(160, 100%, 25%);
		--complementaryColor: hsl(280, 50%, 50%);
		--neutralBackground: hsl(160, 100%, 99%);
		--neutralBackgroundDimmed: hsla(160, 100%, 99%, 50%);
		--neutralBackgroundCompounding: hsla(160, 100%, 5%, 5%);
		--flavorBackground: hsl(160, 50%, 80%);

		--borderRadius: 6px;
		--borderRadiusLarge: 12px;
		--borderWidthThick: 3px;

		--baseSpacing: 1rem;
		--spacingTiny: calc(var(--baseSpacing) * 0.25);
		--spacingSmall: calc(var(--baseSpacing) * 0.5);
		--spacingMedium: var(--baseSpacing);
		--spacingLarge: calc(var(--baseSpacing) * 2);
	}

	:global(h2) {
		font-size: 1.15rem;
		letter-spacing: 0.03em;
		margin: 0;
	}

	:global(h3) {
		font-size: 1rem;
		letter-spacing: 0.03em;
		margin: 0;
	}
</style>
