import type { Card as CardType, CardId, CardsCountType } from '@/types/GameTypes.ts';
import data, { CARDS_COUNT_VALUES, CARDS_PATH } from '@/data/data.ts';
import ICardDatabase from '@/types/core/ICardDatabase.ts';

const cachedDatabase = new Map<CardsCountType, Map<string, CardType>>();

let currentDatabase: Map<CardId, CardType> | null = null;

const CardDatabase: ICardDatabase = {
	initCurrent: (cardsCount) => {
		currentDatabase = CardDatabase.getCardsDatabase(cardsCount);
	},

	getCurrent: () => {
		if (!currentDatabase) {
			currentDatabase = CardDatabase.getCardsDatabase(36);
		}

		return currentDatabase;
	},

	getCurrentIds: (): CardId[] => {
		if (!currentDatabase) {
			currentDatabase = CardDatabase.getCardsDatabase(36);
		}

		return [...currentDatabase.keys()];
	},

	buildId: (value, suit) => {
		const valuePrefix = value === '10' ? '10' : value[0];
		const suitPrefix = suit[0];

		return valuePrefix + suitPrefix;
	},

	getPath: (value, suit) => {
		return `${CARDS_PATH}/${CardDatabase.buildId(value, suit)}.png`;
	},

	buildCardInfo: (value, suit, cardsCount) => {
		const color = suit[0] === 'C' || suit[0] === 'S' ? 'black' : 'red';
		const power = CARDS_COUNT_VALUES[cardsCount].indexOf(value) + 2;

		return <CardType>{
			id: CardDatabase.buildId(value, suit),
			imgPath: CardDatabase.getPath(value, suit),
			name: `${value} ${suit}`,
			color: color,
			power: power,
			suit: suit,
		};
	},

	createCardsDatabase: (cardsCount) => {
		const deck = new Map<CardId, CardType>();

		for (const value of CARDS_COUNT_VALUES[cardsCount]) {
			for (const suit of data.suits) {
				const card = CardDatabase.buildCardInfo(value, suit, cardsCount);

				deck.set(card.id, card);
			}
		}

		return deck;
	},

	getCardsDatabase: (cardsCount) => {
		const cached = cachedDatabase.get(cardsCount);
		if (cached) return cached;

		const db = CardDatabase.createCardsDatabase(cardsCount);
		cachedDatabase.set(cardsCount, db);

		return db;
	},

	getCardById: (cardId) => {
		const card = CardDatabase.getCurrent().get(cardId);

		if (!card) throw new Error(`Card ${cardId} not found`);

		return card;
	},

	tryGetCardById: (cardId) => {
		if(!cardId) return;

		const card = CardDatabase.getCurrent().get(cardId);

		if (!card) throw new Error(`Card ${cardId} not found`);

		return card;
	},

	getCardsById: (cardIds) => {
		const cards: CardType[] = [];

		for (const id of cardIds) {
			const card = CardDatabase.getCardById(id);
			if (card) cards.push(card);
		}

		return cards;
	},

	tryGetCardsById: (cardIds) => {
		if(cardIds.length === 0) return;

		const cards: CardType[] = [];

		for (const id of cardIds) {
			const card = CardDatabase.getCardById(id);
			if (card) cards.push(card);
		}

		return cards;
	},

};


export default CardDatabase;