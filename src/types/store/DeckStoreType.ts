import type { Card } from '@/types/GameTypes.ts';

interface DeckState {
	deck: Card[];
	trumpCard: Card;
}

interface DeckActions {
	updateDeck: (deck: Card[]) => void;
	updateTrumpCard: (trumpCard: Card | null) => void;
	dealCard: () => Card;
	clearAll: () => void;
}

type DeckStoreType = DeckState & DeckActions

export default DeckStoreType;