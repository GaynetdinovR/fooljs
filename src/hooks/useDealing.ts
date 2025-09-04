import useDeckStore from '@/stores/deckStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import { useState } from 'react';
import type { Card } from '@/types/GameTypes.ts';
import { PLAYERS } from '@/data/constants.ts';
import { RULES } from '@/data/rules.ts';

export type AnimationCard = Card & { isBot?: boolean };

const useDealing = () => {
	const { dealCard } = useDeckStore();
	const { giveCardToPlayer } = usePlayersStore();
	const { updateStatus } = useGameStore();

	const dealOneCard =  (player): boolean => {
		const card = dealCard();

		if (card) giveCardToPlayer(player, card)

		return !!card;
	};

	/**
	 * Раздача карт поочередно двум игрокам, обновление статуса
	 */
	const startDealing = () : void => {
		const totalCards = RULES.fool.cardsPerPlayer * RULES.fool.maxPlayers;

		for (let i = 0; i < totalCards; i++) {
			const player = i % 2 === 0 ? PLAYERS[0] : PLAYERS[1];

			if (!dealOneCard(player)) break;
		}

		updateStatus('dealt');
	};

	return {
		startDealing
	};
};

export default useDealing;