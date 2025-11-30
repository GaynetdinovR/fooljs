import DeckService from '@/core/DeckService.ts';
import useDeckStore from '@/stores/deckStore.ts';
import useGameData from '@/utils/hooks/useGameData.ts';

const useDeckInit = (): { initDeck: () => void } => {
	const { settings } = useGameData();
	const { updateDeck, updateTrumpCard } = useDeckStore();

	// Инициализирует колоду и козырь
	const initDeck = () => {
		if (!settings) throw Error('Settings not set!');

		const deckCore = new DeckService(settings.cardsCount);

		const deck = deckCore.bundleDeck();
		const shuffledDeck = deckCore.shuffleDeck(deck);
		const trumpCard = shuffledDeck[shuffledDeck.length - 1]

		updateDeck(shuffledDeck);
		updateTrumpCard(trumpCard);
	}

	return {
		initDeck
	}
};

export default useDeckInit;