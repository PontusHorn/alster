export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
	return typeof value === 'object' && value !== null;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
	return isObject(error) && 'message' in error && typeof error.message === 'string';
}

export function getErrorMessage(error: unknown): string {
	if (isErrorWithMessage(error)) {
		return error.message;
	}

	return String(error);
}
