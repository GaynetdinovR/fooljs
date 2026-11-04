import { CardId, Players } from '@/types/GameTypes.ts';

export type Move = {
	moveNumber: number,
	player: Players,
	cardIds: CardId[],
	action: 'defend' | 'attack' | 'raise'
	attackCardId?: CardId
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