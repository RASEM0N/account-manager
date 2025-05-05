import type { StoreDefinition } from 'pinia';

export const persist = <T extends StoreDefinition, S extends ReturnType<T>>(
	definition: T,
): (() => S) => {
	const key = `__persist__${definition.$id}`;
	let store: ReturnType<T>;

	return () => {
		if (store) {
			return definition() as S;
		}

		store = definition() as S;

		store.$patch(JSON.parse(localStorage.getItem(key) ?? '{}'));
		store.$subscribe((_, state) => localStorage.setItem(key, JSON.stringify(state)));

		return store;
	};
};
