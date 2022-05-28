<script lang="ts">
	import Fonts from '$lib/ui/Fonts.svelte';
</script>

<Fonts />
<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		accent-color: var(--complementaryColor);
		background: var(--flavorBackground);
		color: var(--primaryForeground);
		font-family: var(--sansSerifFont);
		font-weight: 450;
		line-height: 1.5;

		--primaryForeground: hsl(160, 100%, 5%);
		--secondaryForeground: hsl(160, 70%, 23%);
		--flavorColor: hsl(160, 100%, 25%);
		--complementaryColor: hsl(280, 50%, 50%);
		--neutralBackground: hsl(160, 100%, 99%);
		--neutralBackgroundDimmed: hsla(160, 100%, 99%, 50%);
		--neutralBackgroundCompounding: hsla(160, 100%, 5%, 5%);
		--flavorBackground: hsl(160, 50%, 80%);

		--sansSerifFont: Glory, sans-serif;
		--monospaceFont: 'Overpass Mono', monospace;
		--letterSpacingHeading: 0.03em;

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
		font-weight: 550;
		letter-spacing: var(--letterSpacingHeading);
		margin: 0;
	}

	:global(h3) {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: var(--letterSpacingHeading);
		margin: 0;
	}

	:global(button, input, select) {
		color: inherit;
		font: inherit;
		line-height: 1;
	}

	:global(input, select) {
		padding: 0.3em;
	}

	:global(code) {
		font-family: var(--monospaceFont);
		font-weight: 350;
	}
</style>
