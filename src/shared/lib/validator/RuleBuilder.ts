import type { Rules } from './types';
import { FieldBuilder } from './FieldBuilder';

export class RuleBuilder<T> {
	rules: Partial<Rules<T>> = {};

	field<K extends keyof T>(key: K): FieldBuilder<T, K> {
		return new FieldBuilder<T, K>(key, this);
	}

	done(): Partial<Rules<T>> {
		return this.rules;
	}
}
