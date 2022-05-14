import { evaluate, op, ref, val } from '$lib/expression';
import { describe, expect, it } from 'vitest';

describe('evaluate', () => {
	it('resolves single value', () => {
		expect(evaluate([val(5)], {})).toBe(5);
	});

	describe('references', () => {
		it('resolves single reference', () => {
			expect(evaluate([ref('i')], { i: 10 })).toBe(10);
		});

		it('throws on undefined reference', () => {
			expect(() => evaluate([ref('i')], { j: 10 })).toThrowError('Invalid reference: $i');
		});
	});

	describe('addition', () => {
		it('resolves addition of value and value', () => {
			expect(evaluate([val(6), op('+'), val(3)], {})).toBe(9);
		});

		it('resolves addition of value and reference', () => {
			expect(evaluate([val(12), op('+'), ref('i')], { i: 4 })).toBe(16);
		});

		it('resolves addition of reference and reference', () => {
			expect(evaluate([ref('i'), op('+'), ref('j')], { i: 4, j: 2 })).toBe(6);
		});
	});

	describe('subtraction', () => {
		it('resolves subtraction of value and value', () => {
			expect(evaluate([val(6), op('-'), val(3)], {})).toBe(3);
		});

		it('resolves subtraction of value and reference', () => {
			expect(evaluate([val(12), op('-'), ref('i')], { i: 4 })).toBe(8);
		});

		it('resolves subtraction of reference and reference', () => {
			expect(evaluate([ref('i'), op('-'), ref('j')], { i: 4, j: 2 })).toBe(2);
		});
	});

	describe('multiplication', () => {
		it('resolves multiplication of value and value', () => {
			expect(evaluate([val(6), op('*'), val(3)], {})).toBe(18);
		});

		it('resolves multiplication of value and reference', () => {
			expect(evaluate([val(12), op('*'), ref('i')], { i: 4 })).toBe(48);
		});

		it('resolves multiplication of reference and reference', () => {
			expect(evaluate([ref('i'), op('*'), ref('j')], { i: 4, j: 2 })).toBe(8);
		});
	});

	describe('division', () => {
		it('resolves division of value and value', () => {
			expect(evaluate([val(6), op('/'), val(3)], {})).toBe(2);
		});

		it('resolves division of value and reference', () => {
			expect(evaluate([val(12), op('/'), ref('i')], { i: 4 })).toBe(3);
		});

		it('resolves division of reference and reference', () => {
			expect(evaluate([ref('i'), op('/'), ref('j')], { i: 4, j: 2 })).toBe(2);
		});
	});

	describe('remainder', () => {
		it('resolves remainder of value divided by value', () => {
			expect(evaluate([val(7), op('%'), val(3)], {})).toBe(1);
		});

		it('resolves remainder of value divided by reference', () => {
			expect(evaluate([val(12), op('%'), ref('i')], { i: 4 })).toBe(0);
		});

		it('resolves remainder of reference divided by reference', () => {
			expect(evaluate([ref('i'), op('%'), ref('j')], { i: 14, j: 3 })).toBe(2);
		});
	});

	describe('exponent', () => {
		it('resolves value to the power of value', () => {
			expect(evaluate([val(6), op('^'), val(3)], {})).toBe(216);
		});

		it('resolves value to the power of reference', () => {
			expect(evaluate([val(12), op('^'), ref('i')], { i: 4 })).toBe(20736);
		});

		it('resolves reference to the power of reference', () => {
			expect(evaluate([ref('i'), op('^'), ref('j')], { i: 4, j: 2 })).toBe(16);
		});
	});

	describe('multiple sub-expressions and order of operations', () => {
		it('resolves multiple value additions', () => {
			expect(evaluate([val(2), op('+'), val(3), op('+'), val(4)], {})).toBe(9);
		});

		it('resolves multiple value subtractions', () => {
			expect(evaluate([val(2), op('-'), val(3), op('-'), val(4)], {})).toBe(-5);
		});

		it('resolves multiple value multiplications', () => {
			expect(evaluate([val(2), op('*'), val(3), op('*'), val(4)], {})).toBe(24);
		});

		it('resolves multiple value divisions', () => {
			expect(evaluate([val(3), op('/'), val(4), op('/'), val(2)], {})).toBe(0.375);
		});

		it('resolves multiple value remainders left to right', () => {
			expect(evaluate([val(10), op('%'), val(6), op('%'), val(3)], {})).toBe(1);
		});

		it('resolves multiple value exponents left to right', () => {
			expect(evaluate([val(2), op('^'), val(3), op('^'), val(4)], {})).toBe(4096);
		});

		it('resolves mixed value additions and subtractions from left to right', () => {
			expect(evaluate([val(2), op('-'), val(3), op('+'), val(4)], {})).toBe(3);
		});

		it('resolves mixed value multiplications, divisions, and remainders from left to right', () => {
			expect(evaluate([val(100), op('/'), val(2), op('%'), val(20), op('*'), val(3)], {})).toBe(30);
		});

		it('resolves multiplications, divisions, and remainders before additions and subtractions', () => {
			expect(evaluate([val(2), op('+'), val(3), op('*'), val(4)], {})).toBe(14);
			expect(evaluate([val(2), op('-'), val(3), op('*'), val(4)], {})).toBe(-10);
			expect(evaluate([val(2), op('+'), val(3), op('/'), val(4)], {})).toBe(2.75);
			expect(evaluate([val(2), op('-'), val(3), op('/'), val(4)], {})).toBe(1.25);
			expect(evaluate([val(4), op('+'), val(3), op('%'), val(2)], {})).toBe(5);
			expect(evaluate([val(4), op('-'), val(3), op('%'), val(2)], {})).toBe(3);
		});

		it('resolves exponents before multiplications, divisions, and remainders', () => {
			expect(evaluate([val(4), op('*'), val(3), op('^'), val(2)], {})).toBe(36);
			expect(evaluate([val(4), op('/'), val(2), op('^'), val(2)], {})).toBe(1);
			expect(evaluate([val(7), op('%'), val(2), op('^'), val(2)], {})).toBe(3);
		});
	});
});
