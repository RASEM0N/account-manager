import {
	type Account,
	AccountType,
	useAccountStore,
	useAccountValidation,
} from '@/entites/account';
import { TEXT } from '@/shared/config/text';
import type { Reactive } from 'vue';
import { watch } from 'vue';

export const useAccountFormRow = (account: Reactive<Account>) => {
	const store = useAccountStore();
	const { errors, validateField } = useAccountValidation(account);

	const typeOptions = [
		{ label: TEXT.types.LDAP, value: AccountType.ldap },
		{ label: TEXT.types.LOCAL, value: AccountType.local },
	];

	const update = (values: Partial<Account>) => {
		store.update(account.id, values);
	};

	const remove = () => {
		store.remove(account.id);
	};

	const blur = (field: keyof Account) => {
		validateField(field);
	};

	watch(
		() => account.type,
		(value) => {
			account.password = value === AccountType.ldap ? null : '';
		},
	);

	return {
		values: account,
		typeOptions,
		errors,
		update,
		remove,
		blur,
	};
};
