import useDeckStore from '@/stores/deckStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import type { Card } from '@/types/GameTypes.ts';
import { PLAYERS } from '@/data/constants.ts';
import { RULES } from '@/data/rules.ts';
import useGameData from '@/utils/hooks/useGameData.ts';

export type AnimationCard = Card & { isBot?: boolean };

const useDealingLogic = () => {
	const { deck, bot, human } = useGameData();
	const { takeCard, takeCards } = useDeckStore();
	const { giveCardToPlayer, giveCardsToPlayer } = usePlayersStore();

	// Раздает одну карту
	const dealCard = (player): void => {
		const card = takeCard();

		if (!card) throw Error('Dealing card not found!');

		giveCardToPlayer(player, card);
	};

	// Первая раздача карт поочередно двум игрокам, обновление статуса
	const firstDealing = (): void => {
		const totalCards = RULES.fool.cardsPerPlayer * RULES.fool.maxPlayers;

		for (let i = 0; i < totalCards; i++) {
			const player = i % 2 === 0 ? PLAYERS[0] : PLAYERS[1];

			dealCard(player);
		}
	};

	// Раздача карт обоим игрока(по количеству)
	const dealCardsToBothPlayers = (humanCount, botCount) => {
		const humanCards = takeCards(humanCount);
		const botCards = takeCards(botCount);

		giveCardsToPlayer('human', humanCards);
		giveCardsToPlayer('bot', botCards);
	};

	// Раздача карт поровну среди игроков
	const dealCardsEvenly = () => {
		if (deck.length % 2 == 0) {
			return dealCardsToBothPlayers(deck.length / 2, deck.length / 2);
		}

		const moreThanHalf = Math.ceil(deck.length / 2);
		const lessThanHalf = Math.floor(deck.length / 2);

		if (human.length > bot.length) {
			return dealCardsToBothPlayers(moreThanHalf, lessThanHalf);
		}

		dealCardsToBothPlayers(lessThanHalf, moreThanHalf);
	};

	// Раздача карт
	const dealCards = () => {
		let dealToBot = Math.max(0, RULES.fool.cardsPerPlayer - bot.length);
		let dealToHuman = Math.max(0, RULES.fool.cardsPerPlayer - human.length);

		if(deck.length + dealToBot + dealToHuman === 0) return;

		if(dealToHuman === 0 && deck.length < dealToBot) dealToBot = deck.length;
		if(dealToBot === 0 && deck.length < dealToHuman) dealToHuman = deck.length;
		if(dealToBot != 0 && dealToHuman != 0 && deck.length < dealToHuman + dealToBot) return dealCardsEvenly();

		dealCardsToBothPlayers(dealToHuman, dealToBot);
	};

	return {
		firstDealing,
		dealCards,
	};
};

export default useDealingLogic;