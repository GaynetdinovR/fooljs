import CardDatabase from '../../src/core/CardDatabase';
import type { CardId } from '../../src/types/GameTypes';
import { shuffle } from '../../src/utils/utils';
import type { SimState } from '../types/SimGameTypes';

export const initDeck = (state: SimState): SimState => {
	const { settings } = state;

	CardDatabase.initCurrent(settings.cardsCount);

	const shuffledDeck: CardId[] = shuffle<CardId>(CardDatabase.getCurrentIds());
	const trumpCard: CardId = shuffledDeck[shuffledDeck.length - 1];

	return {
		...state,
		deck: shuffledDeck,
		trumpCard: trumpCard,
	};
};