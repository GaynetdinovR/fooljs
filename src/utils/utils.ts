import { CardId } from '@/types/GameTypes.ts';

export const formatToMs = (seconds: number): number => seconds * 1000;

export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export const shuffle = <T>(array: readonly T[]): T[] => {
	const result = [...array];

	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}