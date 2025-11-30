import useBotMemoryStore from '@/stores/botMemoryStore.ts';
import CardService from '@/core/CardService.ts';

const useBotMemory = () => {
	const { updateRaisedCards, addRaisedCards, addBeatenCards, raisedCards } = useBotMemoryStore();
	const removeUsedRaisedCards = (tableCards) => {
		const remainingCards = CardService.findCardsDifference(raisedCards, tableCards);

		updateRaisedCards(remainingCards);
	}

	return {
		updateRaisedCards,
		addRaisedCards,
		removeUsedRaisedCards,
		addBeatenCards
	};
};

export default useBotMemory;