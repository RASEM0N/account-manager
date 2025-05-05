import { RuleBuilder, useValidator } from '@/shared/lib/validator';
import type { Account } from '@/entites/account';
import { AccountType } from '@/entites/account';

export const useAccountValidation = (account: Account) => {
	return useValidator(
		account,
		new RuleBuilder<Account>()

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

			.done(),
	);
};
