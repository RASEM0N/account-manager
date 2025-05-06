import type { RuleBuilder } from './RuleBuilder';
import type { RulePred } from './types';

export class FieldBuilder<T, K extends keyof T> {
	static DEFAULT_ERROR = 'Validation error';

	constructor(
		private readonly _field: K,
		private readonly _ruleBuilder: RuleBuilder<T>,
		private _condition: RulePred<T> = () => true,
	) {}

	when(pred: RulePred<T>) {
		this._condition = pred;
		return this;
	}

	required() {
		return this._push((v) => v !== null && v !== '');
	}

	string(error?: string) {
		return this._push((v) => typeof v === 'string', error);
	}

	min(length: number, error?: string) {
		return this._push((v) => typeof v === 'string' && v.length >= length, error);
	}

	max(length: number, error?: string) {
		return this._push((v) => typeof v === 'string' && v.length <= length, error);
	}

	next() {
		return this._ruleBuilder;
	}

	private _push(
		pred: RulePred<T>,
		error = FieldBuilder.DEFAULT_ERROR,
	): FieldBuilder<T, K> {
		const arr =
			this._ruleBuilder.rules[this._field] ??
			(this._ruleBuilder.rules[this._field] = []);

		arr.push((v, ctx) => {
			if (!this._condition(v, ctx)) {
				return null;
			}

			return pred(v, ctx) ? null : error;
		});
		return this;
	}
}
