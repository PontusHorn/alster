import type {
	Bindings,
	Expression,
	Operator,
	OperatorType,
	Token,
	Value,
	ValueExpression,
	Ref
} from '$lib/types';

export const op = (value: OperatorType): Operator => ({ type: 'operator', value });
export const ref = (name: string): Ref => ({ type: 'ref', name });
export const val = (value: number): Value => ({ type: 'value', value });

export const isOp = (token: Readonly<Token>): token is Operator => token.type === 'operator';
export const getIsOp =
	(...values: OperatorType[]) =>
	(token: Readonly<Token>): token is Operator =>
		isOp(token) && (values.length === 0 || values.includes(token.value));
export const isOpType = (type: unknown): type is OperatorType =>
	type === '+' || type === '-' || type === '*' || type === '/' || type === '%' || type === '^';
export const isRef = (token: Readonly<Token>): token is Ref => token.type === 'ref';
export const isVal = (token: Readonly<Token>): token is Value => token.type === 'value';

export function evaluate(expression: Readonly<Expression>, bindings: Readonly<Bindings>): number {
	let updatedExpression = resolveRefs(expression, bindings);
	updatedExpression = evaluateOperators(['^'], updatedExpression);
	updatedExpression = evaluateOperators(['*', '/', '%'], updatedExpression);
	updatedExpression = evaluateOperators(['+', '-'], updatedExpression);

	if (updatedExpression.length > 1 || !isVal(updatedExpression[0])) {
		throw new Error("Can't resolve expression further: " + expressionToString(updatedExpression));
	}

	return updatedExpression[0].value;
}

export function evaluateOperators(
	operatorTypes: OperatorType[],
	expression: Readonly<ValueExpression>
): ValueExpression {
	const updatedExpression = expression.slice();
	const operators = updatedExpression.filter(getIsOp(...operatorTypes));
	for (const operator of operators) {
		const index = updatedExpression.indexOf(operator);
		updatedExpression.splice(index - 1, 3, resolveExpressionAtIndex(updatedExpression, index));
	}

	return updatedExpression;
}

export function resolveExpressionAtIndex(
	expression: Readonly<ValueExpression>,
	index: number
): Value {
	const left = expression[index - 1];
	const operator = expression[index];
	const right = expression[index + 1];
	if (!isVal(left) || !isVal(right) || !isOp(operator)) {
		throw new Error('Invalid sub-expression: ' + expressionToString([left, operator, right]));
	}

	return { type: 'value', value: resolveOperator(left, operator.value, right) };
}

export function expressionToString(expression: Readonly<Expression>): string {
	return expression.map(tokenToString).join(' ');
}

function tokenToString(token: Readonly<Token>): string {
	switch (token.type) {
		case 'operator':
			return token.value;
		case 'ref':
			return '$' + token.name;
		case 'value':
			return token.value.toString();
	}
}

export function stringToExpression(value: string): Expression | null {
	const expression: Expression = [];
	const match = value.match(/\+|-|\*|\/|%|\^|-?\d+(?:\.\d+)?|\$[a-zA-Z0-9_]+/g);
	if (match === null) return null;

	for (const stringToken of match) {
		if (isOpType(stringToken)) {
			expression.push(op(stringToken));
		} else if (stringToken.startsWith('$')) {
			expression.push(ref(stringToken.slice(1)));
		} else {
			const number = Number.parseFloat(stringToken);
			if (Number.isNaN(number)) return null;
			expression.push(val(number));
		}
	}

	return expression;
}

function resolveRefs(
	expression: Readonly<Expression>,
	bindings: Readonly<Bindings>
): ValueExpression {
	return expression.map((token) => {
		if (!isRef(token)) return token;

		const value = bindings[token.name];
		if (typeof value !== 'number') {
			throw new Error('Invalid reference: ' + tokenToString(token));
		}

		return { type: 'value', value };
	});
}

function resolveOperator(
	left: Readonly<Value>,
	operator: Readonly<OperatorType>,
	right: Readonly<Value>
): number {
	switch (operator) {
		case '+':
			return left.value + right.value;
		case '-':
			return left.value - right.value;
		case '*':
			return left.value * right.value;
		case '/':
			return left.value / right.value;
		case '%':
			return left.value % right.value;
		case '^':
			return left.value ** right.value;
	}
}
