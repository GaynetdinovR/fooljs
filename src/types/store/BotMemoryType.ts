import type { Card } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

interface BotMemoryState {
	trumpCards: Card[],
	beatenCards: [ { [key: string]: string } ]
	beatenWithTrumps: Card[],
	raisedCards: Card[],
	usedStrongCards: Card[],
	humanCards: Card[]
}

interface BotMemoryActions {
	updateRaisedCards: (raisedCards: Card[]) => void;
	addRaisedCards: (raisedCards: Card[]) => void;
	addBeatenCards: (beatenCards: TableCardPair[]) => void;
	clearAll: () => void;
}

type BotMemoryType = BotMemoryState & BotMemoryActions

export default BotMemoryType;