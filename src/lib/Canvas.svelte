<script lang="ts">
	let canvas: HTMLCanvasElement;
	$: ctx = canvas?.getContext('2d');
</script>

<canvas width="800" height="600" bind:this={canvas} />

<style>
	canvas {
		width: 800px;
		height: 600px;
	}
</style>
