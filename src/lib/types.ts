export type Config = {
	background: Color;
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

export type Shape = Rectangle;

export type Rectangle = {
	type: 'rectangle';
	color: Color;
	x: Expression;
	y: Expression;
	width: Expression;
	height: Expression;
};

export type Color = RandomColor | Hsl | Rgb;
export type RandomColor = { type: 'randomColor' };
export type Hsl = { type: 'hsl'; hue: Expression; saturation: Expression; lightness: Expression };
export type Rgb = { type: 'rgb'; red: Expression; green: Expression; blue: Expression };

export type Bindings = Record<string, number>;
export type Expression = Token[];
export type ValueExpression = Exclude<Token, Ref>[];
export type Token = Ref | Value | Operator;
export type Operator = { type: 'operator'; value: OperatorType };
export type OperatorType = '+' | '-' | '*' | '/' | '%' | '^';
export type Ref = { type: 'ref'; name: string };
export type Value = { type: 'value'; value: number };
