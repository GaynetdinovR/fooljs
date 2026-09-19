import useBotMemoryStore from '@/stores/botMemoryStore.ts';

import CardService from '@/core/CardService.ts';

import type { BotMemoryActions } from '@/types/store/BotMemoryType.ts';
import type { Card as CardType } from '@/types/GameTypes.ts';

type BotMemory = Pick<BotMemoryActions, 'updateRaisedCards' | 'addRaisedCards' | 'addBeatenCards'> & {
	removeUsedRaisedCards: (tableCards: CardType[]) => void,
}

// TODO: Возможно заменить тип TableCardPair на CardType
const useBotMemory = (): BotMemory => {
	const { updateRaisedCards, addRaisedCards, addBeatenCards, raisedCards } = useBotMemoryStore();

	const removeUsedRaisedCards = (tableCards) => {
		const remainingCards = CardService.findCardsDifference(raisedCards, tableCards);

		updateRaisedCards(remainingCards);
	};

	return {
		updateRaisedCards,
		addRaisedCards,
		removeUsedRaisedCards,
		addBeatenCards,
	};
};

export default useBotMemory;
