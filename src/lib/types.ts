export type WorkConfig = {
	/** Meta data about the work */
	meta: WorkMeta;
	/** Config for the canvas and the root level of drawing data */
	base: BaseConfig;
	/** Record of all iterations */
	iterations: Iteration[];
	/** Record of all shapes */
	shapes: Shape[];
};

export type WorkMeta = {
	id: string;
	name: string;
};

export type BaseConfig = {
	background: Color;
	width: number;
	height: number;
	/** Iterations that are enabled at the root level */
	iterationIds: Iteration['id'][];
};

export type Iteration = {
	type: 'iteration';
	id: string;
	name: string;
	start: number;
	end: number;
	shapeIds: Shape['id'][];
	iterationIds: Iteration['id'][];
};

export type Shape = Rectangle | Ellipse;

export type Rectangle = {
	type: 'shape';
	shapeType: 'rectangle';
	id: string;
	color: Color;
	x: Expression;
	y: Expression;
	width: Expression;
	height: Expression;
	rotation: Expression;
};

export type Ellipse = {
	type: 'shape';
	shapeType: 'ellipse';
	id: string;
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
export enum OperatorType {
	Add = '+',
	Subtract = '-',
	Multiply = '*',
	Divide = '/',
	Modulo = '%',
	Raise = '^'
}
export type Ref = { type: 'ref'; name: string };
export type Value = { type: 'value'; value: number };
