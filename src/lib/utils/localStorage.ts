import { browser } from '$app/env';

export function getFromLocalStorage<Value>(key: string, defaultValue: Value): Value {
	if (!browser) return defaultValue;

	const rawValue = window.localStorage.getItem(key);
	if (!rawValue) return defaultValue;

	try {
		return JSON.parse(rawValue);
	} catch (e) {
		console.error(`Failed to parse localStorage value for key ${key}`, e);
		return defaultValue;
	}
}

export function setToLocalStorage<Value>(key: string, value: Value): void {
	if (!browser) return;

	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error(`Failed to save value to localStorage for key ${key}`, e);
	}
}
