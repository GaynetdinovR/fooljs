import type { Card as CardType, CardsCountType } from '@/types/GameTypes.ts';

/**
 * Возвращает уменьшенное количество карт, которые нужно показать в колоде
 */
export const getSmalledCardsCountForDeck = ({ length }: CardType[]): number => {
	if(length === 1) return 0;
	if (length > 1 && length < 7) return 1;

	return Math.floor(length / 7);
};

/**
 * Возвращает уменьшенное количество карт, которые нужно показать в бито
 */
export const getSmalledCardsCountForFall = ({ length }: CardType[]): number => {
	if (length === 0) return 0;

	return Math.floor(length / 7) + 1;
};