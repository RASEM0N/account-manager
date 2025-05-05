import type { Rules } from './types';
import { reactive } from 'vue';
import { Validator } from './Validator';

export const useValidator = <T, K extends keyof T>(
	state: T,
	rules: Partial<Rules<T>>,
) => {
	const validator = new Validator<T, K>(state, rules);
	const errors = reactive<Record<string, boolean>>({});

	const validateField = (field: K): boolean => {
		const value = validator.validate(field);
		errors[field as string] = value;
		return value;
	};

	const validateAll = (): boolean => {
		return Object.keys(rules).every((v) => validateField(v as K));
	};

	return { errors, validateField, validateAll } as const;
};
