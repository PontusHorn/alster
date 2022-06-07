import { evaluate, exp, op, ref, stringToExpression, val } from '$lib/utils/expression';
import { describe, expect, it } from 'vitest';

describe('evaluate', () => {
	it('resolves single value', () => {
		expect(evaluate(exp(val(5)), {})).toBe(5);
	});

	describe('references', () => {
		it('resolves single reference', () => {
			expect(evaluate(exp(ref('i')), { i: 10 })).toBe(10);
		});

		it('throws on undefined reference', () => {
			expect(() => evaluate(exp(ref('i')), { j: 10 })).toThrowError('Invalid reference: [i]');
		});
	});

	describe('addition', () => {
		it('resolves addition of value and value', () => {
			expect(evaluate(exp(val(6), op('+'), val(3)), {})).toBe(9);
		});

		it('resolves addition of value and reference', () => {
			expect(evaluate(exp(val(12), op('+'), ref('i')), { i: 4 })).toBe(16);
		});

		it('resolves addition of reference and reference', () => {
			expect(evaluate(exp(ref('i'), op('+'), ref('j')), { i: 4, j: 2 })).toBe(6);
		});
	});

	describe('subtraction', () => {
		it('resolves subtraction of value and value', () => {
			expect(evaluate(exp(val(6), op('-'), val(3)), {})).toBe(3);
		});

		it('resolves subtraction of value and reference', () => {
			expect(evaluate(exp(val(12), op('-'), ref('i')), { i: 4 })).toBe(8);
		});

		it('resolves subtraction of reference and reference', () => {
			expect(evaluate(exp(ref('i'), op('-'), ref('j')), { i: 4, j: 2 })).toBe(2);
		});
	});

	describe('multiplication', () => {
		it('resolves multiplication of value and value', () => {
			expect(evaluate(exp(val(6), op('*'), val(3)), {})).toBe(18);
		});

		it('resolves multiplication of value and reference', () => {
			expect(evaluate(exp(val(12), op('*'), ref('i')), { i: 4 })).toBe(48);
		});

		it('resolves multiplication of reference and reference', () => {
			expect(evaluate(exp(ref('i'), op('*'), ref('j')), { i: 4, j: 2 })).toBe(8);
		});
	});

	describe('division', () => {
		it('resolves division of value and value', () => {
			expect(evaluate(exp(val(6), op('/'), val(3)), {})).toBe(2);
		});

		it('resolves division of value and reference', () => {
			expect(evaluate(exp(val(12), op('/'), ref('i')), { i: 4 })).toBe(3);
		});

		it('resolves division of reference and reference', () => {
			expect(evaluate(exp(ref('i'), op('/'), ref('j')), { i: 4, j: 2 })).toBe(2);
		});
	});

	describe('remainder', () => {
		it('resolves remainder of value divided by value', () => {
			expect(evaluate(exp(val(7), op('%'), val(3)), {})).toBe(1);
		});

		it('resolves remainder of value divided by reference', () => {
			expect(evaluate(exp(val(12), op('%'), ref('i')), { i: 4 })).toBe(0);
		});

		it('resolves remainder of reference divided by reference', () => {
			expect(evaluate(exp(ref('i'), op('%'), ref('j')), { i: 14, j: 3 })).toBe(2);
		});
	});

	describe('exponent', () => {
		it('resolves value to the power of value', () => {
			expect(evaluate(exp(val(6), op('^'), val(3)), {})).toBe(216);
		});

		it('resolves value to the power of reference', () => {
			expect(evaluate(exp(val(12), op('^'), ref('i')), { i: 4 })).toBe(20736);
		});

		it('resolves reference to the power of reference', () => {
			expect(evaluate(exp(ref('i'), op('^'), ref('j')), { i: 4, j: 2 })).toBe(16);
		});
	});

	describe('multiple sub-expressions and order of operations', () => {
		it('resolves multiple value additions', () => {
			expect(evaluate(exp(val(2), op('+'), val(3), op('+'), val(4)), {})).toBe(9);
		});

		it('resolves multiple value subtractions', () => {
			expect(evaluate(exp(val(2), op('-'), val(3), op('-'), val(4)), {})).toBe(-5);
		});

		it('resolves multiple value multiplications', () => {
			expect(evaluate(exp(val(2), op('*'), val(3), op('*'), val(4)), {})).toBe(24);
		});

		it('resolves multiple value divisions', () => {
			expect(evaluate(exp(val(3), op('/'), val(4), op('/'), val(2)), {})).toBe(0.375);
		});

		it('resolves multiple value remainders left to right', () => {
			expect(evaluate(exp(val(10), op('%'), val(6), op('%'), val(3)), {})).toBe(1);
		});

		it('resolves multiple value exponents left to right', () => {
			expect(evaluate(exp(val(2), op('^'), val(3), op('^'), val(4)), {})).toBe(4096);
		});

		it('resolves mixed value additions and subtractions from left to right', () => {
			expect(evaluate(exp(val(2), op('-'), val(3), op('+'), val(4)), {})).toBe(3);
		});

		it('resolves mixed value multiplications, divisions, and remainders from left to right', () => {
			expect(evaluate(exp(val(100), op('/'), val(2), op('%'), val(20), op('*'), val(3)), {})).toBe(
				30
			);
		});

		it('resolves multiplications, divisions, and remainders before additions and subtractions', () => {
			expect(evaluate(exp(val(2), op('+'), val(3), op('*'), val(4)), {})).toBe(14);
			expect(evaluate(exp(val(2), op('-'), val(3), op('*'), val(4)), {})).toBe(-10);
			expect(evaluate(exp(val(2), op('+'), val(3), op('/'), val(4)), {})).toBe(2.75);
			expect(evaluate(exp(val(2), op('-'), val(3), op('/'), val(4)), {})).toBe(1.25);
			expect(evaluate(exp(val(4), op('+'), val(3), op('%'), val(2)), {})).toBe(5);
			expect(evaluate(exp(val(4), op('-'), val(3), op('%'), val(2)), {})).toBe(3);
		});

		it('resolves exponents before multiplications, divisions, and remainders', () => {
			expect(evaluate(exp(val(4), op('*'), val(3), op('^'), val(2)), {})).toBe(36);
			expect(evaluate(exp(val(4), op('/'), val(2), op('^'), val(2)), {})).toBe(1);
			expect(evaluate(exp(val(7), op('%'), val(2), op('^'), val(2)), {})).toBe(3);
		});
	});
});

describe('stringToExpression', () => {
	it('converts a string to an expression', () => {
		expect(stringToExpression('2+3')).toEqual(exp(val(2), op('+'), val(3)));
	});

	it('ignores whitespace', () => {
		expect(stringToExpression(' 2 +  3 ')).toEqual(exp(val(2), op('+'), val(3)));
	});

	it('treats sequential digits as single number', () => {
		expect(stringToExpression('255 + 4096')).toEqual(exp(val(255), op('+'), val(4096)));
	});

	it('handles negated numbers', () => {
		expect(stringToExpression('-2 + -3')).toEqual(exp(val(-2), op('+'), val(-3)));
	});

	it('handles decimals', () => {
		expect(stringToExpression('2.0 + 3.14')).toEqual(exp(val(2), op('+'), val(3.14)));
	});

	it('handles all operators', () => {
		expect(stringToExpression('2+3')).toEqual(exp(val(2), op('+'), val(3)));
		expect(stringToExpression('2-3')).toEqual(exp(val(2), op('-'), val(3)));
		expect(stringToExpression('2*3')).toEqual(exp(val(2), op('*'), val(3)));
		expect(stringToExpression('2/3')).toEqual(exp(val(2), op('/'), val(3)));
		expect(stringToExpression('2%3')).toEqual(exp(val(2), op('%'), val(3)));
		expect(stringToExpression('2^3')).toEqual(exp(val(2), op('^'), val(3)));
	});

	it('creates sub-expressions for brackets', () => {
		expect(stringToExpression('(2 + 3)')).toEqual(exp(exp(val(2), op('+'), val(3))));
	});

	it('creates sub-expressions for nested brackets', () => {
		expect(stringToExpression('(2 + 3) * (1.5 / ((-3 + 2) * 4))')).toEqual(
			exp(
				exp(val(2), op('+'), val(3)),
				op('*'),
				exp(val(1.5), op('/'), exp(exp(val(-3), op('+'), val(2)), op('*'), val(4)))
			)
		);
	});

	it('throws on unmatched brackets', () => {
		expect(() => stringToExpression('(2 + 3')).toThrow('Unmatched start bracket');
		expect(() => stringToExpression('2 + 3)')).toThrow('Unmatched end bracket');
	});

	it('creates refs for letters surrounded by square brackets', () => {
		expect(stringToExpression('[a] + [b]')).toEqual(exp(ref('a'), op('+'), ref('b')));
	});

	it('allows uppercase and lowercase letters, digits, spaces, and underscores in ref name', () => {
		expect(stringToExpression('[abc 123]+[_ABC]')).toEqual(
			exp(ref('abc 123'), op('+'), ref('_ABC'))
		);
	});
});
