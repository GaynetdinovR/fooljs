import type ICard from '@/types/core/ICard.ts';
import type { Card, Suits } from '@/types/GameTypes.ts';

class CardService implements ICard {

	/**
	 * Выбирает случайную карту из массива и возвращает ее вместе с отфильтрованным массивом
	 * @param array
	 * @returns [card, filteredArray]
	 */
	static giveRandomElemFromArray = (array: []): [any, any[]] => {
		const arrayCopy = [...array];

		const randomIndex = Math.floor(Math.random() * arrayCopy.length);
		const [randomCard]: Card[] = arrayCopy.splice(randomIndex, 1);

		return [randomCard, arrayCopy];
	};

	/**
	 * Выбирает случайные карты из массива и возвращает их вместе с отфильтрованным массивом
	 * @param cardsCount - количество случайных карт для выбора
	 * @param array
	 * @returns [randomCards, filteredArray]
	 */
	static giveRandomCardsFromArray = (cardsCount: number, array: Card[]): [Card[], Card[]] => {
		if (cardsCount <= 0) return [[], [...array]];
		if (cardsCount > array.length) {
			throw new Error(`Requested ${cardsCount} cards but array has only ${array.length} cards`);
		}

		const randomCards: Card[] = [];
		let arrayCopy: Card[] = [...array];

		for (let i = 0; i < cardsCount; i++) {
			const [card, newArray] = this.giveRandomCardFromArray(arrayCopy);

			arrayCopy = [...newArray];
			randomCards.push(card);
		}

		return [randomCards, arrayCopy];
	};

	/**
	 * Удаляет карту из массива карт по id
	 * @param cardId
	 * @param array
	 * @returns [card, filteredArray]
	 */
	static deleteCardFromArray = (cardId: string, array: Card[]): [Card, Card[]] => {
		const filteredArray: Card[] = [];
		let foundCard: Card | null = null;

		for (const card of array) {
			if (card.id === cardId) {
				foundCard = card;
				continue;
			}
			filteredArray.push(card);
		}

		if (!foundCard) {
			throw new Error(`Card with id ${cardId} not found in array`);
		}

		return [foundCard, filteredArray];
	};

	/**
	 * Находит меньшую по масти карту среди множества
	 * @param cards
	 * @param suit
	 * @returns lowestSuitCard
	 */
	static findLowestSuit = (cards: Card[], suit: Suits): Card | null => {
		let lowestSuitCard: Card | null = null;

		for (const card of cards) {
			if (card.suit === suit) {
				if (!lowestSuitCard || card.power < lowestSuitCard.power) {
					lowestSuitCard = card;
				}
			}
		}

		return lowestSuitCard;
	};

	static getUniqCardValues = (cards: Card[]): number[] => {
		const values = new Set<number>();

		cards.forEach(card => {
			if(card) values.add(card.power)
		});

		return Array.from(values);
	}
}

export default CardService;