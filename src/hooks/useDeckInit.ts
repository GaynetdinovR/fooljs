import useGameData from '@/utils/hooks/useGameData.ts';

import useDeckStore from '@/stores/deckStore.ts';
import CardDatabase from '@/core/CardDatabase.ts';

import { shuffle } from '@/utils/utils.ts';
import { CardId } from '@/types/GameTypes.ts';

const useDeckInit = (): { initDeck: () => void } => {
	const { settings } = useGameData();
	const { updateDeck, updateTrumpCard } = useDeckStore();

	/**
	 * Инициализирует колоду и козырь
 	 */
	const initDeck = () => {
		CardDatabase.initCurrent(settings.cardsCount);

		const shuffledDeck: CardId[] = shuffle<CardId>(CardDatabase.getCurrentIds());
		const trumpCard: CardId = shuffledDeck[shuffledDeck.length - 1];

		updateDeck(shuffledDeck);
		updateTrumpCard(trumpCard);
	};

	return {
		initDeck,
	};
};

export default useDeckInit;
