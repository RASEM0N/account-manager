import {
	type Account,
	type AccountWithTextLabels,
	AccountType,
	useAccountStore,
	textFromAccountLabels,
	useAccountValidation,
	accountLabelsFromText,
} from '@/entites/account';
import type { Reactive } from 'vue';
import { TEXT } from '@/shared/config/text';
import { reactive, watch } from 'vue';

export const useAccountForm = (account: Reactive<Account>) => {
	const values = reactive<AccountWithTextLabels>({
		...account,
		labels: textFromAccountLabels(account.labels),
	});

	const store = useAccountStore();
	const { errors, validateAll } = useAccountValidation();

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

	const getNormalizedValues = (): AccountWithTextLabels => {
		return {
			id: values.id,
			type: values.type,
			password: !values.password ? null : values.password.trim(),
			labels: values.labels.trim(),
			login: values.login.trim(),
		};
	};

	const tryUpdateAccount = () => {
		const values = getNormalizedValues();

		if (!validateAll(values)) {
			return;
		}

		store.update(account.id, {
			...values,
			labels: accountLabelsFromText(values.labels),
		});
	};

	const onBlur = () => {
		tryUpdateAccount();
	};

	watch(
		() => values.type,
		(value) => {
			values.password = value === AccountType.ldap ? null : '';
			tryUpdateAccount();
		},
	);

	return {
		values,
		typeOptions,
		errors,
		update,
		remove,
		onBlur,
	};
};
