import {
	type Account,
	AccountType,
	useAccountStore,
	textFromAccountLabels,
	useAccountValidation,
	accountLabelsFromText,
} from '@/entites/account';
import type { Reactive } from 'vue';
import { TEXT } from '@/shared/config/text';
import { reactive, watch } from 'vue';

export const useAccountFormRow = (account: Reactive<Account>) => {
	const values = reactive({
		...account,
		labels: textFromAccountLabels(account.labels),
	});

	const store = useAccountStore();
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

	watch(values, ({ type, login, labels, password }, prev) => {
		console.log(prev)
		account.type = type;
		account.login = login;
		account.password = password;
		account.labels = accountLabelsFromText(labels);
	});

	watch(
		() => values.type,
		(value) => {
			// особо ни наче не влияет повторный вызов watch
			values.password = value === AccountType.ldap ? null : '';
		},
	);

	return {
		values,
		typeOptions,
		errors,
		update,
		remove,
		blur,
	};
};
