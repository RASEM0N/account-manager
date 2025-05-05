export interface Account {
	id: string;
	labels: AccountLabel[];
	type: AccountType;
	login: string;
	password: string | null;
}

export interface AccountWithTextLabels extends Omit<Account, 'labels'> {
	labels: string;
}

export interface AccountLabel {
	text: string;
}

export enum AccountType {
	ldap = 'ldap',
	local = 'local',
}
