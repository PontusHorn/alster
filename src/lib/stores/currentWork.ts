import chainsConfig from '$lib/presets/chains';
import type { WorkConfig } from '$lib/types';
import { getFromLocalStorage, setToLocalStorage } from '$lib/utils/localStorage';
import { derived, writable, type Readable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'currentWork';
const initialConfig = getFromLocalStorage<WorkConfig>(LOCAL_STORAGE_KEY, chainsConfig);

export const metaConfig = writable(initialConfig.meta);
export const baseConfig = writable(initialConfig.base);
export const iterations = writable(initialConfig.iterations);
export const shapes = writable(initialConfig.shapes);

export const config: Readable<WorkConfig> = derived(
	[metaConfig, baseConfig, iterations, shapes],
	([$metaConfig, $baseConfig, $iterations, $shapes]) => ({
		meta: $metaConfig,
		base: $baseConfig,
		iterations: $iterations,
		shapes: $shapes
	})
);

// Persist every store update to localStorage
config.subscribe((value) => setToLocalStorage(LOCAL_STORAGE_KEY, value));
