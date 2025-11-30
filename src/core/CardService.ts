import type ICard from '@/types/core/ICard.ts';
import type { Card, Suits } from '@/types/GameTypes.ts';

class CardService implements ICard {

	/**
	 * Находит пересечения массивов карт, возвращает массив пересечений
	 * @param firstCardsArray
	 * @param secondCardsArray
	 */
	static findCardsIntersection = (firstCardsArray: Card[], secondCardsArray: Card[]): Card[] | [] => {
		return firstCardsArray.filter(card1 =>
			secondCardsArray.some(card2 => card1.id === card2.id),
		);
	};

	/**
	 * Находит разницу массивов карт, возвращает массив разницы от первого
	 * @param firstCardsArray
	 * @param secondCardsArray
	 */
	static findCardsDifference = (firstCardsArray: Card[], secondCardsArray: Card[]): Card[] => {
		return firstCardsArray.filter(card1 =>
			!secondCardsArray.some(card2 => card1.id === card2.id),
		);
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

	static getLowestNonTrump = (cards, trumpSuit) => {
		const filtered = cards.filter(card => card.suit != trumpSuit);

		let min = filtered[0];

		for(const card of filtered){
			if(min.power > card.power) min = card;
		}

		return min;
	};

	static findCardById = (cards, id) => {
		return cards.filter(card => card.id === id)[0];
	};

	static getUniqCardValues = (cards: Card[]): number[] => {
		const values = new Set<number>();

		cards.forEach(card => {
			if (card) values.add(card.power);
		});

		return Array.from(values);
	};

	/**
	 * Возвращает отсортированные карты (Сначала козырные по убыванию, затем остальные по убыванию)
	 */
	static sortCards = (cards: Card[], trumpSuit: Suits): Card[] => {
		cards.sort((a, b) => b.power - a.power);

		const trumpCards = cards.filter((card) => card.suit == trumpSuit);
		const notTrumpCards = cards.filter((card) => card.suit != trumpSuit);

		return [...trumpCards, ...notTrumpCards];
	};
}

export default CardService;