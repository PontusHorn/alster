import type {
	Bindings,
	Expression,
	Operator,
	OperatorValue,
	Token,
	Value,
	ValueExpression,
	Ref
} from '$lib/types';

export const op = (value: OperatorValue): Operator => ({ type: 'operator', value });
export const ref = (name: string): Ref => ({ type: 'ref', name });
export const val = (value: number): Value => ({ type: 'value', value });

export const isOp = (token: Token): token is Operator => token.type === 'operator';
export const getIsOp =
	(value?: OperatorValue) =>
	(token: Token): token is Operator =>
		isOp(token) && (value === undefined || token.value === value);
export const isRef = (token: Token): token is Ref => token.type === 'ref';
export const isVal = (token: Token): token is Value => token.type === 'value';

export function evaluate(expression: Expression, bindings: Bindings): number {
	const valueExpression = resolveRefs(expression, bindings);

	const multiplications = valueExpression.filter(getIsOp('*'));
	for (const operator of multiplications) {
		const index = valueExpression.indexOf(operator);
		const left = valueExpression[index - 1];
		const right = valueExpression[index + 1];
		if (!isVal(left) || !isVal(right)) {
			throw new Error('Invalid multiplication: ' + expressionToString([left, operator, right]));
		}

		const result = resolveOperator(left, operator.value, right);
		valueExpression.splice(index - 1, 3, { type: 'value', value: result });
	}

	if (valueExpression.length > 1 || !isVal(valueExpression[0])) {
		throw new Error("Can't resolve expression further: " + expressionToString(valueExpression));
	}

	return valueExpression[0].value;
}

function expressionToString(expression: Expression): string {
	return expression.map(tokenToString).join(' ');
}

function tokenToString(token: Token): string {
	switch (token.type) {
		case 'operator':
			return token.value;
		case 'ref':
			return '$' + token.name;
		case 'value':
			return token.value.toString();
	}
}

function resolveRefs(expression: Expression, bindings: Bindings): ValueExpression {
	return expression.map((token) => {
		if (!isRef(token)) return token;

		const value = bindings[token.name];
		if (typeof value !== 'number') {
			throw new Error('Invalid reference: ' + tokenToString(token));
		}

		return { type: 'value', value };
	});
}

function resolveOperator(left: Value, operator: OperatorValue, right: Value): number {
	switch (operator) {
		case '*':
			return left.value * right.value;
	}
}

export function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
