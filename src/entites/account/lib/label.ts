import type { AccountLabel } from '../model/types';

export const textFromAccountLabels = (labels: AccountLabel[]): string => {
	if (!Array.isArray(labels)) {
		return '';
	}

	return labels.map((v) => v.text).join('; ');
};

export const accountLabelsFromText = (text: string): AccountLabel[] => {
	return text
		.split(';')
		.map((v) => v.trim())
		.filter(Boolean)
		.map((v) => ({ text: v }));
};
