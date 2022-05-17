<div>
	<slot />
</div>

<style>
	div {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		margin-bottom: 1rem;
	}
</style>
