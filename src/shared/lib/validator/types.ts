export type RuleFn<T> = (value: any, ctx: T) => string | null;
export type Rules<T> = Record<keyof T, RuleFn<T>[]>;
export type RulePred<T> = (value: any, ctx: T) => boolean;
