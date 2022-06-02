import type { Iteration, Shape } from '$lib/types';
import { writable } from 'svelte/store';

export type EditedItem = {
	type: (Iteration | Shape)['type'];
	id: string;
};
export const editedItem = writable<EditedItem | undefined>(undefined);
