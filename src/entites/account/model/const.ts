import { v4 as uuid } from 'uuid';
import type { Account } from './types';
import { AccountType } from './types';

export const createEmptyAccount = (): Account => {
	return {
		id: uuid(),
		labels: [],
		type: AccountType.local,
		login: '',
		password: '',
	};
};
