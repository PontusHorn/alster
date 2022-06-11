import {
	type Bindings,
	type Expression,
	type Operator,
	OperatorType,
	type Token,
	type Value,
	type ValueExpression,
	type Ref,
	type ExpressionPart,
	type ValueToken
} from '$lib/types';

export const op = (value: OperatorType): Operator => ({ type: 'operator', value });
export const ref = (name: string): Ref => ({ type: 'ref', name });
export const val = (value: number): Value => ({ type: 'value', value });
export const exp = (...value: ExpressionPart[]): Expression => ({
	type: 'expression',
	value
});
export type ToExpInput = ExpressionPart[] | number | string;
export const toExp = (value: Expression | ExpressionPart[] | number | string): Expression => {
	if (typeof value === 'number') return exp(val(value));
	if (typeof value === 'string') return stringToExpression(value);

	if (Array.isArray(value)) {
		return { type: 'expression', value };
	}

	return value;
};

export const isOp = (part: Readonly<ExpressionPart>): part is Operator => part.type === 'operator';
export const getIsOp =
	(...values: OperatorType[]) =>
	(part: Readonly<ExpressionPart>): part is Operator =>
		isOp(part) && (values.length === 0 || values.includes(part.value));
export const isOpType = (type: unknown): type is OperatorType =>
	type === '+' || type === '-' || type === '*' || type === '/' || type === '%' || type === '^';
export const isRef = (part: Readonly<ExpressionPart>): part is Ref => part.type === 'ref';
export const isVal = (part: Readonly<ExpressionPart>): part is Value => part.type === 'value';
export const isExpression = (part: Readonly<ExpressionPart>): part is Expression =>
	part.type === 'expression';

export function evaluate(expression: Readonly<Expression>, bindings: Readonly<Bindings>): number {
	let updatedExpression = resolveRefs(expression, bindings);
	updatedExpression = evaluateSubExpressions(updatedExpression);
	updatedExpression = evaluateOperators([OperatorType.Raise], updatedExpression);
	updatedExpression = evaluateOperators(
		[OperatorType.Multiply, OperatorType.Divide, OperatorType.Modulo],
		updatedExpression
	);
	updatedExpression = evaluateOperators(
		[OperatorType.Add, OperatorType.Subtract],
		updatedExpression
	);

	if (updatedExpression.value.length > 1 || !isVal(updatedExpression.value[0])) {
		throw new Error("Can't resolve expression further: " + expressionToString(updatedExpression));
	}

	return updatedExpression.value[0].value;
}

export function evaluateSubExpressions(expression: ValueExpression): ValueExpression {
	const updatedExpression = { ...expression, value: expression.value.slice() };
	const subExpressions = updatedExpression.value.filter(isExpression);
	for (const subExpression of subExpressions) {
		const index = updatedExpression.value.indexOf(subExpression);
		updatedExpression.value.splice(index, 1, val(evaluate(subExpression, {})));
	}

	return updatedExpression;
}

export function evaluateOperators(
	operatorTypes: OperatorType[],
	expression: Readonly<ValueExpression>
): ValueExpression {
	const updatedExpression = { ...expression, value: expression.value.slice() };
	const operators = updatedExpression.value.filter(getIsOp(...operatorTypes));
	for (const operator of operators) {
		const index = updatedExpression.value.indexOf(operator);
		updatedExpression.value.splice(
			index - 1,
			3,
			resolveExpressionAtIndex(updatedExpression, index)
		);
	}

	return updatedExpression;
}

export function resolveExpressionAtIndex(expression: ValueExpression, index: number): Value {
	const left = expression.value[index - 1];
	const operator = expression.value[index];
	const right = expression.value[index + 1];
	if (!isVal(left) || !isVal(right) || !isOp(operator)) {
		throw new Error('Invalid sub-expression: ' + expressionToString(exp(left, operator, right)));
	}

	return { type: 'value', value: resolveOperator(left, operator.value, right) };
}

export function expressionToString(expression: Readonly<Expression>): string {
	return expression.value
		.map((part) => (isExpression(part) ? `(${expressionToString(part)})` : tokenToString(part)))
		.join(' ');
}

function tokenToString(token: Readonly<Token>): string {
	switch (token.type) {
		case 'operator':
			return token.value;
		case 'ref':
			return `[${token.name}]`;
		case 'value':
			return token.value.toString();
	}
}

export function stringToExpression(value: string): Expression {
	const expression = exp();
	const match = value.match(
		/\+|(?<!(^|[+\-*/%^(])\s*)-|\*|\/|%|\^|\(|\)|-?\d+(?:\.\d+)?|\[[a-zA-Z0-9 _]+\]/g
	);
	if (match === null) {
		throw new Error('No valid tokens found in expression' + value);
	}

	const expressionStack = [expression];
	let currentExpression: Expression;
	for (const stringToken of match) {
		currentExpression = expressionStack[expressionStack.length - 1];

		if (stringToken === '(') {
			expressionStack.push(exp());
		} else if (stringToken === ')') {
			const subExpression = expressionStack.pop();
			if (!subExpression || subExpression === expression) {
				throw new Error('Unmatched end bracket: ' + value);
			}
			if (subExpression.value.length > 0) {
				currentExpression = expressionStack[expressionStack.length - 1];
				currentExpression.value.push(subExpression);
			}
		} else if (isOpType(stringToken)) {
			currentExpression.value.push(op(stringToken));
		} else if (stringToken.startsWith('[') && stringToken.endsWith(']')) {
			currentExpression.value.push(ref(stringToken.slice(1, -1)));
		} else {
			const number = Number.parseFloat(stringToken);
			if (Number.isNaN(number)) {
				throw new Error('Invalid number: ' + stringToken);
			}
			currentExpression.value.push(val(number));
		}
	}

	if (expressionStack.length > 1) {
		throw new Error('Unmatched start bracket: ' + value);
	}

	return expression;
}

function resolveRefs(
	expression: Readonly<Expression>,
	bindings: Readonly<Bindings>
): ValueExpression {
	const value = expression.value.map((part): ValueToken | ValueExpression => {
		if (isExpression(part)) {
			return resolveRefs(part, bindings);
		}

		if (!isRef(part)) return part;

		const value = bindings[part.name];
		if (typeof value !== 'number') {
			throw new Error('Invalid reference: ' + tokenToString(part));
		}

		return { type: 'value', value };
	});

	return { type: 'expression', value };
}

function resolveOperator(
	left: Readonly<Value>,
	operator: Readonly<OperatorType>,
	right: Readonly<Value>
): number {
	switch (operator) {
		case OperatorType.Add:
			return left.value + right.value;
		case OperatorType.Subtract:
			return left.value - right.value;
		case OperatorType.Multiply:
			return left.value * right.value;
		case OperatorType.Divide:
			return left.value / right.value;
		case OperatorType.Modulo:
			return left.value % right.value;
		case OperatorType.Raise:
			return left.value ** right.value;
	}
}

export function mapExpressionTokens(
	expression: Expression,
	callback: (token: Token) => Token
): Expression {
	return {
		...expression,
		value: expression.value.map((part) =>
			isExpression(part) ? mapExpressionTokens(part, callback) : callback(part)
		)
	};
}

export function getOperatorSymbol(type: OperatorType): string {
	switch (type) {
		case OperatorType.Add:
		case OperatorType.Subtract:
		case OperatorType.Divide:
		case OperatorType.Raise:
			return type;
		case OperatorType.Multiply:
			return '×';
		case OperatorType.Modulo:
			return 'mod';
	}
}

export function getOperatorName(type: OperatorType): string {
	switch (type) {
		case OperatorType.Add:
			return 'plus';
		case OperatorType.Subtract:
			return 'minus';
		case OperatorType.Multiply:
			return 'times';
		case OperatorType.Divide:
			return 'divided by';
		case OperatorType.Raise:
			return 'raised to the power of';
		case OperatorType.Modulo:
			return 'modulo';
	}
}
