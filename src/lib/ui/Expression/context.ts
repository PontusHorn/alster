import type { ExpressionPart } from '$lib/types';
import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

type EditedExpressionPart = ExpressionPart | undefined;
export type EditedExpressionPartContext = Writable<EditedExpressionPart>;
export const EDITED_EXPRESSION_PART_CONTEXT = {};
export function setEditedExpressionPartContext(value: EditedExpressionPartContext): void {
	setContext(EDITED_EXPRESSION_PART_CONTEXT, value);
}
export function getEditedExpressionPartContext(): EditedExpressionPartContext {
	return getContext(EDITED_EXPRESSION_PART_CONTEXT);
}
