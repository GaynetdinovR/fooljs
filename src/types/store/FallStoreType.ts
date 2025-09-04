import type { Card } from '@/types/GameTypes.ts';

interface FallState {
	fall: Card[]
}

interface FallActions {
	updateFall: (newFall: Card[]) => void;
	clearAll: () => void;
}

type FallStoreType = FallState & FallActions

export default FallStoreType;