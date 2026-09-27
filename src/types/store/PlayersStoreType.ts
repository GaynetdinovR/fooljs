import type { CardId, Players } from '@/types/GameTypes.ts';

interface PlayersState {
	human: CardId[];
	bot: CardId[];
}

interface PlayersActions {
	updateHumanHand: (hand: CardId[]) => void;
	updateBotHand: (hand: CardId[]) => void;
	giveCardToPlayer: (player: Players, card: CardId) => void;
	giveCardsToPlayer: (player: Players, cards: CardId[]) => void;
	removeCardFromPlayer: (player: Players, card: CardId) => void;
	clearAll: () => void;
}

type PlayersStoreType = PlayersState & PlayersActions;

export default PlayersStoreType;
