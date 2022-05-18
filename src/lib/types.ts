export type Config = {
	background: Color;
	width: number;
	height: number;
	pattern: Pattern | undefined;
};

export type Pattern = {
	start: number;
	end: number;
	each: Iteration;
};

export type Iteration = {
	shape: Shape;
};

export type Shape = Rectangle | Ellipse;

export type Rectangle = {
	type: 'rectangle';
	color: Color;
	x: Expression;
	y: Expression;
	width: Expression;
	height: Expression;
	rotation: Expression;
};

export type Ellipse = {
	type: 'ellipse';
	color: Color;
	x: Expression;
	y: Expression;
	width: Expression;
	height: Expression;
	rotation: Expression;
};

export type Color = HexColor | RandomColor | NumberedColor | Hsl | Rgb;
export enum ColorType {
	Hex = 'hexColor',
	Random = 'randomColor',
	Numbered = 'numberedColor',
	Hsl = 'hslColor',
	Rgb = 'rgbColor'
}
export type HexColor = { type: ColorType.Hex; hex: string };
export type RandomColor = { type: ColorType.Random };
export type NumberedColor = { type: ColorType.Numbered; value: Expression };
export type Hsl = {
	type: ColorType.Hsl;
	hue: Expression;
	saturation: Expression;
	lightness: Expression;
};
export type Rgb = {
	type: ColorType.Rgb;
	red: Expression;
	green: Expression;
	blue: Expression;
};

export type Bindings = Record<string, number>;
export type Expression<T extends Token = Token> = {
	type: 'expression';
	value: ExpressionPart<T>[];
};
export type ExpressionPart<T extends Token = Token> = T | Expression;
export type ValueExpression = Expression<ValueToken>;
export type ValueToken = Exclude<Token, Ref>;
export type Token = Ref | Value | Operator;
export type Operator = { type: 'operator'; value: OperatorType };
export type OperatorType = '+' | '-' | '*' | '/' | '%' | '^';
export type Ref = { type: 'ref'; name: string };
export type Value = { type: 'value'; value: number };
