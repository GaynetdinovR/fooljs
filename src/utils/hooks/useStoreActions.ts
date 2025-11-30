import useDeckStore from '@/stores/deckStore.ts';
import useFallStore from '@/stores/fallStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import useTableStore from '@/stores/tableStore.ts';
import type { Card, Players } from '@/types/GameTypes.ts';

const useStoreActions = () => {
	const {
		updateDeck,
		dealCard,
		dealCards,
		updateTrumpCard,
		clearAll: clearDeck,
	} = useDeckStore();

	const {
		updateFall,
		moveToFall,
		clearAll: clearFall,
	} = useFallStore();

	const {
		updateSettings,
		updateTurn,
		updateStatus,
		updateStats,
		clearAll: clearGame,
	} = useGameStore();

	const {
		updateHumanHand,
		updateBotHand,
		giveCardToPlayer,
		giveCardsToPlayer,
		removeCardFromPlayer,
		clearAll: clearPlayers,
	} = usePlayersStore();

	const {
		updateTable,
		addAttackCard,
		addDefendCard,
		clearAll: clearTable,
	} = useTableStore();

	const attackWithCard = (card: Card, player: Players) => {
		removeCardFromPlayer(player, card);
		addAttackCard(card);
	};

	const defendWithCard = (attackCardId: string, defendingCard: Card, player: Players) => {
		removeCardFromPlayer(player, defendingCard);
		addDefendCard(attackCardId, defendingCard);
	};

	return {
		// Deck actions
		updateDeck,
		dealCard,
		dealCards,
		updateTrumpCard,
		clearDeck,

		// Fall actions
		updateFall,
		moveToFall,
		clearFall,

		// Game actions
		updateSettings,
		updateTurn,
		updateStatus,
		updateStats,
		clearGame,

		// Players actions
		updateHumanHand,
		updateBotHand,
		giveCardToPlayer,
		giveCardsToPlayer,
		removeCardFromPlayer,
		clearPlayers,

		// Table actions
		updateTable,
		addAttackCard,
		addDefendCard,
		clearTable,

		// Complex actions
		attackWithCard,
		defendWithCard
	}
};

export default useStoreActions;