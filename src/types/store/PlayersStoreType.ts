import type { Card, Players } from '@/types/GameTypes.ts';

interface PlayersState {
	human: Card[];
	bot: Card[];
}

interface PlayersActions {
	updateHumanHand: (hand: Card[]) => void;
	updateBotHand: (hand: Card[]) => void;
	giveCardToPlayer: (player: Players, card: Card) => void;
	giveCardsToPlayer: (player: Players, cards: Card[]) => void;
	removeCardFromPlayer: (player: Players, card: Card) => void;
	clearAll: () => void;
}

type PlayersStoreType = PlayersState & PlayersActions;

export default PlayersStoreType;