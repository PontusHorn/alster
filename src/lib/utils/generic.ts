export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
	return typeof value === 'object' && value !== null;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
	return isObject(error) && 'message' in error && typeof error.message === 'string';
}

export function hasProperty<Obj, Prop extends string>(
	obj: Obj,
	prop: Prop
): obj is Obj & Record<Prop, unknown> {
	return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, prop);
}

export function getErrorMessage(error: unknown): string {
	if (isErrorWithMessage(error)) {
		return error.message;
	}

	return String(error);
}

export function randomId() {
	return Math.random().toString(36).slice(2);
}

export function without<T>(array: T[], ...values: T[]): T[] {
	return array.filter((value) => !values.includes(value));
}
