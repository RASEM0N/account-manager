import {
	type Account,
	AccountType,
	useAccountStore,
	useAccountValidation,
} from '@/entites/account';
import { TEXT } from '@/shared/config/text';
import { reactive } from 'vue';

export const useAccountFormRow = (account: Account) => {
	const store = useAccountStore();
	const values = reactive({ ...account });
	const { errors, validateField } = useAccountValidation(values);

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

	return {
		values,
		typeOptions,
		errors,
		update,
		remove,
		blur,
	};
};
