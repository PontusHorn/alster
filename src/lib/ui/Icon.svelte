<script context="module" lang="ts">
	export type IconName = 'Edit' | 'Delete' | 'Info';
</script>

<script lang="ts">
	import { assets } from '$app/paths';

	export let size = '1.5em';
	export let icon: IconName;
</script>

<svg class={$$props.class} width={size} height={size}>
	<use href="{assets}/icons/{icon}.svg#{icon}" />
</svg>
