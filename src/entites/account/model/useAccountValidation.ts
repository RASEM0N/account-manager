import { RuleBuilder, useValidator } from '@/shared/lib/validator';
import { AccountType } from '@/entites/account';
import type { AccountWithTextLabels } from './types';

export const useAccountValidation = (account: AccountWithTextLabels) => {
	return useValidator(
		account,
		new RuleBuilder<AccountWithTextLabels>()

			.field('labels')
			.string()
			.max(50)
			.next()

			.field('login')
			.string()
			.required()
			.max(100)
			.next()

			.field('password')
			.when((_, ctx) => ctx.type === AccountType.local)
			.string()
			.required()
			.max(1)
			.max(100)
			.next()

			.field('type')
			.when((v) => v in AccountType)
			.next()

			.done(),
	);
};
