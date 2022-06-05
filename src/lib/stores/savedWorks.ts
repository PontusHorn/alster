import type { WorkConfig } from '$lib/types';
import { getFromLocalStorage, setToLocalStorage } from '$lib/utils/localStorage';
import { writable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'savedWorks';

export const savedWorks = writable(getFromLocalStorage<WorkConfig[]>(LOCAL_STORAGE_KEY, []));

// Persist every store update to localStorage
savedWorks.subscribe((value) => setToLocalStorage(LOCAL_STORAGE_KEY, value));
