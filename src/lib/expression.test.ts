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

	describe('multiplication', () => {
		it('resolves multiplication of value and value', () => {
			expect(evaluate([val(5), op('*'), val(3)], {})).toBe(15);
		});

		it('resolves multiplication of value and reference', () => {
			expect(evaluate([val(5), op('*'), ref('i')], { i: 4 })).toBe(20);
		});

		it('resolves multiplication of reference and reference', () => {
			expect(evaluate([ref('i'), op('*'), ref('j')], { i: 4, j: 3 })).toBe(12);
		});
	});
});
