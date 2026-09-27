import type { CardId } from '@/types/GameTypes.ts';

interface DeckState {
	deck: CardId[];
	trumpCard: CardId;
}

interface DeckActions {
	updateDeck: (deck: CardId[]) => void;
	updateTrumpCard: (trumpCard: CardId | null) => void;
	takeCard: () => CardId;
	takeCards: (count: number) => CardId[];
	clearAll: () => void;
}

type DeckStoreType = DeckState & DeckActions;

export default DeckStoreType;
