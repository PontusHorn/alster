import { expect, test } from '@playwright/test';

test('editing size fields updates canvas width', async ({ page }) => {
	await page.goto('/');
	const canvas = page.locator('canvas');
	const widthField = page.locator('text=Width');
	const heightField = page.locator('text=Height');

	// Make sure the default values are consistent
	expect(await canvas.getAttribute('width')).toBe('800');
	expect(await widthField.inputValue()).toBe('800');
	expect(await canvas.getAttribute('height')).toBe('600');
	expect(await heightField.inputValue()).toBe('600');

	// Update the values
	await widthField.fill('480');
	expect(await canvas.getAttribute('width')).toBe('480');
	await heightField.fill('640');
	expect(await canvas.getAttribute('height')).toBe('640');
});
