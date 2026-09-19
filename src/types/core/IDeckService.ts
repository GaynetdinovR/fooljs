import type { Card as CardType, CardsCountType } from '@/types/GameTypes.ts';

export interface IDeckService {
	// Масти карт
	suits: string[];

	// Значения карт
	values: string[];

	// Количество карт в колоде
	cardCount: CardsCountType;

	/**
	 * Метод инициализации
	 */
	initialize: () => void;

	/**
	 * Устанавливает значения карт по их общему количеству
	 */
	setCardsDataByCount: () => void;

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
