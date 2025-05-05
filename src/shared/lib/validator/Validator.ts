import type { Rules } from './types';

export class Validator<T, K extends keyof T> {
	constructor(
		private readonly _state: T,
		private readonly _rules: Partial<Rules<T>>,
	) {}

	validate(field: K): boolean {
		return (this._rules[field] ?? []).every((fn) =>
			fn(this._state[field], this._state),
		);
	}
}
