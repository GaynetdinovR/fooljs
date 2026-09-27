import type { CardId } from '@/types/GameTypes.ts';

interface FallState {
	fall: CardId[];
}

interface FallActions {
	updateFall: (fall: CardId[]) => void;
	clearAll: () => void;
	moveToFall: (cards: CardId[]) => void;
}

type FallStoreType = FallState & FallActions;

export default FallStoreType;
