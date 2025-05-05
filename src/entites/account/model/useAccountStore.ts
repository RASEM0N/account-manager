import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { v4 as uuid } from 'uuid';
import { AccountType } from './types';
import type { Account } from './types';

export const createEmptyAccount = (): Account => {
	return {
		id: uuid(),
		labels: '',
		type: AccountType.local,
		login: '',
		password: '',
	};
};

export const useAccountStore = defineStore('accounts', () => {
	const accounts = reactive<Account[]>([]);

	const add = (payload: Account = createEmptyAccount()) => {
		accounts.push(payload);
	};

	const update = (id: string, payload: Partial<Account>) => {
		const idx = accounts.findIndex((a) => a.id === id);
		if (idx === -1) {
			return;
		}
		accounts[idx] = { ...accounts[idx], ...payload };
	};

	const remove = (id: string) => {
		const idx = accounts.findIndex((a) => a.id === id);
		if (idx === -1) {
			return;
		}
		accounts.splice(idx, 1);
	};

	return {
		accounts,
		add,
		update,
		remove,
	};
});
