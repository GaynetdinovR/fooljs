import { Players } from '@/types/GameTypes.ts';

export type Move = {
	moveNumber: number,
	player: Players,
	cardIds: string[],
	action: 'defend' | 'attack' | 'raise'
	attackCardId?: string
}

interface MoveHistoryState {
	history: Move[]
}

interface MoveHistoryActions {
	addMoveToHistory: (move: Move) => void;
	updateHistory: (history: Move[]) => void;
	clearAll: () => void;
}

type MoveHistoryType = MoveHistoryActions & MoveHistoryState;

export default MoveHistoryType;