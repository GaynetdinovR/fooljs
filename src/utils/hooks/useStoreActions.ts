import useDeckStore from '@/stores/deckStore.ts';
import useFallStore from '@/stores/fallStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import useTableStore from '@/stores/tableStore.ts';

import type { Card as CardType, CardId, Players } from '@/types/GameTypes.ts';
import useMoveHistoryStore from '@/stores/moveHistoryStore.ts';

/**
 * Фасад над сторами для удобства.
 *
 * подписка идёт на весь стор (без селекторов).
 * Это осознанное решение, ререндеры не критичны для пет-проекта.
 */
const useStoreActions = () => {
	const {
		updateDeck,
		takeCard,
		takeCards,
		updateTrumpCard,
		clearAll: clearDeck,
	} = useDeckStore();

	const { updateFall, moveToFall, clearAll: clearFall } = useFallStore();

	const {
		updateSettings,
		updateTurn,
		updateStatus,
		updateStats,
		incrementMoveNumber,
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

	const { updateTable, addAttackCard, addDefendCard, clearAll: clearTable } = useTableStore();

	const {
		addMoveToHistory,
		updateHistory,
		clearAll: clearMoveHistory,
	} = useMoveHistoryStore();

	const attackWithCard = (card: CardId, player: Players) => {
		removeCardFromPlayer(player, card);
		addAttackCard(card);

		addMoveToHistory({
			moveNumber: useGameStore.getState().moveNumber ?? 0,
			player: player,
			action: 'attack',
			cardIds: [card],
		});
	};

	const defendWithCard = (attackCard: CardId, defendCard: CardId, player: Players) => {
		removeCardFromPlayer(player, defendCard);
		addDefendCard(attackCard, defendCard);

		addMoveToHistory({
			moveNumber: useGameStore.getState().moveNumber ?? 0,
			player: player,
			action: 'defend',
			cardIds: [defendCard],
			attackCardId: attackCard,
		});
	};

	return {
		// Deck actions
		updateDeck,
		takeCard,
		takeCards,
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
		incrementMoveNumber,
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

		// Move History
		addMoveToHistory,
		updateHistory,
		clearMoveHistory,

		// Complex actions
		attackWithCard,
		defendWithCard,
	};
};

export default useStoreActions;
