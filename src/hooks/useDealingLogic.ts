import useDeckStore from '@/stores/deckStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';

import useGameData from '@/utils/hooks/useGameData.ts';
import DealingService from '@/core/DealingService.ts';

type DealingLogic = {
	/**
	 * Раздача карт обоим игрокам(по количеству)
	 */
	dealCardsToBothPlayers: (humanCount: number, botCount: number) => void,
	/**
	 * Раздача карт поровну среди игроков(если их не хватает в колоде)
	 */
	dealCardsEvenly: () => void,
	/**
	 * Общий метод раздачи карт
	 */
	dealCards: () => void,
}

const useDealingLogic = (): DealingLogic => {
	const { deck, bot, human } = useGameData();
	const { takeCards } = useDeckStore();
	const { giveCardsToPlayer } = usePlayersStore();

	const dealCardsToBothPlayers = (humanCount: number, botCount: number) => {
		const humanCards = takeCards(humanCount);
		const botCards = takeCards(botCount);

		if (!humanCards || !botCards) throw new Error('Something wrong with deck!');

		giveCardsToPlayer('human', humanCards);
		giveCardsToPlayer('bot', botCards);
	};

	const dealCardsEvenly = () => {
		const [toHuman, toBot] = DealingService.getEvenDealCounts(human, bot, deck.length);

		dealCardsToBothPlayers(toHuman, toBot);
	};

	const dealCards = () => {
		if (DealingService.shouldDealEvenly(human, bot, deck.length)) return dealCardsEvenly();

		const [toHuman, toBot] = DealingService.getDealCounts(human, bot, deck.length);

		if (toHuman === 0 && toBot === 0) return;

		dealCardsToBothPlayers(toHuman, toBot);
	};

	return {
		dealCards,
		dealCardsEvenly,
		dealCardsToBothPlayers
	};
};

export default useDealingLogic;
