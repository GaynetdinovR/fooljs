import { RULES } from '@/data/rules.ts';

import useDeckStore from '@/stores/deckStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';

import useGameData from '@/utils/hooks/useGameData.ts';

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

	const dealCardsToBothPlayers = (humanCount, botCount) => {
		const humanCards = takeCards(humanCount);
		const botCards = takeCards(botCount);

		giveCardsToPlayer('human', humanCards);
		giveCardsToPlayer('bot', botCards);
	};

	const dealCardsEvenly = () => {
		if (deck.length % 2 === 0) {
			return dealCardsToBothPlayers(deck.length / 2, deck.length / 2);
		}

		const moreThanHalf = Math.ceil(deck.length / 2);
		const lessThanHalf = Math.floor(deck.length / 2);

		if (human.length > bot.length) {
			return dealCardsToBothPlayers(moreThanHalf, lessThanHalf);
		}

		dealCardsToBothPlayers(lessThanHalf, moreThanHalf);
	};

	const dealCards = () => {
		let dealToBot = Math.max(0, RULES.fool.cardsPerPlayer - bot.length);
		let dealToHuman = Math.max(0, RULES.fool.cardsPerPlayer - human.length);

		if (deck.length + dealToBot + dealToHuman === 0) return;

		if (dealToHuman === 0 && deck.length < dealToBot) dealToBot = deck.length;
		if (dealToBot === 0 && deck.length < dealToHuman) dealToHuman = deck.length;
		if (dealToBot !== 0 && dealToHuman !== 0 && deck.length < dealToHuman + dealToBot)
			return dealCardsEvenly();

		dealCardsToBothPlayers(dealToHuman, dealToBot);
	};

	return {
		dealCards,
		dealCardsEvenly,
		dealCardsToBothPlayers
	};
};

export default useDealingLogic;
