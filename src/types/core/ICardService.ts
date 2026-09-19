import type { Card as CardType, Suits } from '@/types/GameTypes.ts';

export type ICardService = {
	/**
	 * Находит пересечения массивов карт, возвращает массив пересечений
	 */
	findCardsIntersection: (firstCardsArray: CardType[], secondCardsArray: CardType[]) => CardType[] | [],

	/**
	 * Находит разницу массивов карт, возвращает массив разницы от первого
	 */
	findCardsDifference: (firstCardsArray: CardType[], secondCardsArray: CardType[]) => CardType[],

	/**
	 * Удаляет карту из массива карт по id
	 */
	deleteCardFromArray: (cardId: string, array: CardType[]) => [CardType, CardType[]],
	/**
	 * Находит меньшую по масти карту среди множества
	 */
	findLowestSuit: (cards: CardType[], suit: Suits) => CardType | undefined

	/**
	 * Находит наименьшую НЕ козырную карту
	 */
	getLowestNonTrump: (cards: CardType[], trumpSuit: Suits) => CardType | undefined
	/**
	 * Находит наименьшую карту(в т.ч. козыри)
	 */
	getLowestCard: (cards: CardType[], trumpSuit: Suits) => CardType

	/**
	 * Находит карту по id
	 */
	findCardById: (cards: CardType[], id: string) => CardType

	/**
	 * TODO: Разобраться че за метод
	 */
	getUniqCardValues: (cards: CardType[]) => number[]

	/**
	 * Возвращает отсортированные карты (Сначала козырные по убыванию, затем остальные по убыванию)
	 */
	sortCards: (cards: CardType[], trumpSuit: Suits) => CardType[]
}