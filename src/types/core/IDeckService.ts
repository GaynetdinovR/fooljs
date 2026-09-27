import type { Card as CardType, CardsCountType } from '@/types/GameTypes.ts';

export interface IDeckService {
	// Количество карт в колоде
	cardCount: CardsCountType;

	/**
	 * Возвращает уникальный id карты
	 */
	getId: (value: string, suit: string) => string;

	/**
	 * Возвращает путь к изображению карты
	 */
	getPath: (value: string, suit: string) => string;

	/**
	 * Возвращает собранный объект карты
	 */
	getCardInfo: (value: string, suit: string) => CardType;

	/**
	 * Создает и возвращает колоду карт
	 */
	bundleDeck: () => CardType[];

	/**
	 * Возвращает перемешанную колоду
	 */
	shuffleDeck: (deck: CardType[]) => CardType[];
}
