enum Color {
	veryDarkGreen = 'hsl(160, 100%, 5%)',
	veryDarkGreenAlpha5 = 'hsla(160, 100%, 5%, 5%)',
	darkGreen = 'hsl(160, 70%, 23%)',
	strongGreen = 'hsl(160, 100%, 25%)',
	strongGreenAlpha5 = 'hsla(160, 100%, 25%, 5%)',
	softGreen = 'hsl(160, 50%, 80%)',
	softGreenAlpha50 = 'hsla(160, 50%, 80%, 50%)',
	veryLightGreen = 'hsl(160, 100%, 99%)',
	veryLightGreenAlpha50 = 'hsla(160, 100%, 99%, 50%)',
	violet = 'hsl(280, 50%, 50%)'
}

export enum ThemeCategoryName {
	color = 'color',
	font = 'font',
	letterSpacing = 'letterSpacing',
	borderRadius = 'borderRadius',
	borderWidth = 'borderWidth',
	spacing = 'spacing'
}

export const THEME = {
	[ThemeCategoryName.color]: {
		primaryForeground: Color.veryDarkGreen,
		secondaryForeground: Color.darkGreen,
		flavor: Color.strongGreen,
		complementary: Color.violet,
		neutralBackground: Color.veryLightGreen,
		neutralBackgroundDimmed: Color.veryLightGreenAlpha50,
		flavorBackground: Color.softGreen,
		flavorBackgroundCompounding: Color.strongGreenAlpha5,
		flavorBackgroundDimmed: Color.softGreenAlpha50
	},

	[ThemeCategoryName.font]: {
		sansSerif: 'Glory, sans-serif',
		monospace: "'Overpass Mono', monospace"
	},

	[ThemeCategoryName.letterSpacing]: {
		heading: '0.03em'
	},

	[ThemeCategoryName.borderRadius]: {
		medium: '6px',
		large: '12px'
	},

	[ThemeCategoryName.borderWidth]: {
		thick: '3px'
	},

	[ThemeCategoryName.spacing]: {
		none: '0',
		tiny: '0.25rem',
		small: '0.5rem',
		medium: '1rem',
		large: '2rem'
	}
};

export type Theme = typeof THEME;
export type ThemeColor = keyof Theme['color'];
export type ThemeFont = keyof Theme['font'];
export type ThemeLetterSpacing = keyof Theme['letterSpacing'];
export type ThemeBorderRadius = keyof Theme['borderRadius'];
export type ThemeBorderWidth = keyof Theme['borderWidth'];
export type ThemeSpacing = keyof Theme['spacing'];

export function cssVar<Category extends ThemeCategoryName>(
	category: Category,
	key: keyof typeof THEME[Category]
): string {
	return `var(--${category}-${key})`;
}

export function colorVar(key: ThemeColor): string {
	return cssVar(ThemeCategoryName.color, key);
}

export function fontVar(key: ThemeFont): string {
	return cssVar(ThemeCategoryName.font, key);
}

export function spacingVar(key: ThemeSpacing): string {
	return cssVar(ThemeCategoryName.spacing, key);
}

const themeVars = Object.entries(THEME).flatMap(([categoryName, category]) =>
	Object.entries(category).map(([name, value]) => `--${categoryName}-${name}: ${value};`)
);

export const themeTag = `
		<style>
			:root {
				${themeVars.join(`
				`)}
			}
		</style>
`;
