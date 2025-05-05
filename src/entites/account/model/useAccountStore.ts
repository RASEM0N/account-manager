import { defineStore } from 'pinia';
import type { Account } from './types';
import { createEmptyAccount } from './const';
import { persist } from '@/shared/lib/persist';

interface AccountStoreState {
	accounts: Account[];
}

export const useAccountStore = persist(
	defineStore('accounts', {
		state: (): AccountStoreState => ({ accounts: [] }),
		actions: {
			add(account: Account = createEmptyAccount()) {
				this.accounts.push(account);
			},
			update(id: string, account: Partial<Account>) {
				const idx = this.accounts.findIndex((a) => a.id === id);
				if (idx === -1) {
					return;
				}
				this.accounts[idx] = { ...this.accounts[idx], ...account };
			},

			remove(id: string) {
				const idx = this.accounts.findIndex((a) => a.id === id);
				if (idx === -1) {
					return;
				}
				this.accounts.splice(idx, 1);
			},
		},
	}),
);
