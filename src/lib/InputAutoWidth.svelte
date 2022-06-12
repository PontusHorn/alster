<script lang="ts">
	export let value: string | number;
</script>

<input {...$$props} style:--chars={value.toString().length} bind:value />

<style>
	input {
		font-family: var(--font-monospace);
		width: calc(var(--chars, 5) * 1ch + 4ch);
	}
</style>
