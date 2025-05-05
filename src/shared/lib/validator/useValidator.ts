import type { Rules } from './types';
import { reactive } from 'vue';
import { Validator } from './Validator';

export const useValidator = <T, K extends keyof T>(rules: Partial<Rules<T>>) => {
	const validator = new Validator<T, K>(rules);
	const errors = reactive({}) as Partial<Record<K, string>>;

	const validate = (state: T, field: K): boolean => {
		const error = validator.validate(state, field);

		if (!error) {
			delete errors[field as K];
			return true;
		}

		errors[field as K] = error;
		return false;
	};

	const validateAll = (state: T): boolean => {
		let isValid = true;

		Object.keys(rules).forEach((v) => {
			if (!validate(state, v as K)) {
				isValid = false;
			}
		});

		return isValid;
	};

	const isValid = (state: T, field: K): boolean => {
		return validator.isValid(state, field);
	};

	const isValidAll = (state: T): boolean => {
		return validator.isValidAll(state);
	};

	return {
		errors,
		validate,
		validateAll,
		isValid,
		isValidAll,
	} as const;
};
