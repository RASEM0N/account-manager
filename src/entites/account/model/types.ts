export interface Account {
	id: string;
	labels: string;
	type: AccountType;
	login: string;
	password: string | null;
}

export enum AccountType {
	ldap = 'ldap',
	local = 'local',
}
