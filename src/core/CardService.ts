import type { Card as CardType } from '@/types/GameTypes.ts';
import { ICardService } from '@/types/core/ICardService.ts';

const CardService: ICardService = {
	findCardsIntersection: (firstCardsArray, secondCardsArray) => {
		return firstCardsArray.filter((card1) =>
			secondCardsArray.some((card2) => card1.id === card2.id),
		);
	},

	findCardsDifference: (firstCardsArray, secondCardsArray) => {
		return firstCardsArray.filter(
			(card1) => !secondCardsArray.some((card2) => card1.id === card2.id),
		);
	},

	deleteCardFromArray: (cardId, array) => {
		const filteredArray: CardType[] = [];
		let foundCard: CardType | undefined = undefined;

		for (const card of array) {
			if (card.id === cardId) {
				foundCard = card;
				continue;
			}
			filteredArray.push(card);
		}

		if (!foundCard) throw new Error(`Card with id ${cardId} not found in array`);

		return [foundCard, filteredArray];
	},

	findLowestSuit: (cards, suit) => {
		let lowestSuitCard: CardType | undefined = undefined;

		for (const card of cards) {
			if (card.suit === suit) {
				if (!lowestSuitCard || card.power < lowestSuitCard.power) {
					lowestSuitCard = card;
				}
			}
		}

		return lowestSuitCard;
	},

	getLowestNonTrump: (cards, trumpSuit) => {
		const nonTrumpCards = cards.filter(card => card.suit !== trumpSuit);

		if (nonTrumpCards.length === 0) return;

		let min = nonTrumpCards[0];

		for (const card of nonTrumpCards) {
			if (card.power < min.power) min = card;
		}

		return min;
	},

	getLowestCard: (cards, trumpSuit) => {
		const nonTrumpMin = CardService.getLowestNonTrump(cards, trumpSuit);

		if (nonTrumpMin) return nonTrumpMin;

		let min: CardType = cards[0];

		for (const card of cards) {
			if (card.power < min.power) min = card;
		}

		return min;
	},

	findCardById: (cards, id) => {
		const card = cards.find((cardel) => cardel.id === id);

		if (!card) throw new Error(`Card ${id} not found`);

		return card;
	},

	getUniqCardValues: (cards) => {
		const values = new Set<number>();

		cards.forEach((card) => {
			if (card) values.add(card.power);
		});

		return Array.from(values);
	},

	sortCards: (cards, trumpSuit) => {
		cards.sort((a, b) => b.power - a.power);

		const trumpCards = cards.filter((card) => card.suit === trumpSuit);
		const notTrumpCards = cards.filter((card) => card.suit !== trumpSuit);

		return [...trumpCards, ...notTrumpCards];
	},
}
;

export default CardService;
