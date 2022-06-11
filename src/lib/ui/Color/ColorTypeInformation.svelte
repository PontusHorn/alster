<div class="colorTypeInformation">
	<h3>Color types</h3>
	<dl>
		<dt>HSL</dt>
		<dd>
			HSL stands for Hue, Saturation, and Lightness, and is an easy way to generate a range of
			colors that match, for example with different hues but the same saturation and lightness.
		</dd>

		<dt>RGB</dt>
		<dd>
			RGB stands for Red, Green, and Blue, and is a very common way to specify digital colors.
		</dd>

		<dt>Fixed color</dt>
		<dd>Fixed color is just that - a static color that you pick.</dd>

		<dt>Numbered color</dt>
		<dd>
			Numbered colors are randomly chosen, but will stay stable for any given number throughout the
			session.
		</dd>

		<dt>Random color</dt>
		<dd>
			Random colors are generated each time the canvas is re-drawn, so are generally a bad fit when
			generating an animated work, but for static works they're a simple way to get dynamic colors.
		</dd>
	</dl>
</div>

<style>
	.colorTypeInformation {
		max-width: 90vw;
		padding: var(--spacing-medium);
		width: 50ch;
	}

	h3 {
		margin-block-end: var(--spacing-small);
	}

	dt {
		font-weight: 600;
	}

	dd {
		margin-block-end: var(--spacing-small);
		padding-inline-start: var(--spacing-medium);
	}

	dd:last-child {
		margin-block-end: 0;
	}
</style>
