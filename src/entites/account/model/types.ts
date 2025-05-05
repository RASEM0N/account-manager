export interface Account {
    id: string;
    labels: string;
    type: AccountType;
    login: string;
    password?: string;
}

export enum AccountType {
    ldap = 'ldap',
    local = 'local',
}