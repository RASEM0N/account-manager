import type { Rules } from './types';

export class Validator<T, K extends keyof T> {
	constructor(private readonly _rules: Partial<Rules<T>>) {}

	validate(state: T, field: K): string | null {
		return (
			(this._rules[field] ?? [])
				.map((fn) => fn(state[field], state))
				.find((v) => v) ?? null
		);
	}

	isValid(state: T, field: K): boolean {
		return (this._rules[field] ?? []).every((fn) => !fn(state[field], state));
	}

	isValidAll(state: T): boolean {
		return Object.keys(this._rules).every((v) => this.isValid(state, v as K));
	}
}
