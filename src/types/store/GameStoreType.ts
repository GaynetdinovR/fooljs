import type { GameSettings, GameStatus, Players } from '@/types/GameTypes.ts';

interface GameState {
	settings: GameSettings,
	status: GameStatus,
	turn: Players | null,
}

interface GameActions {
	updateSettings: (newSettings: GameSettings) => void,
	updateTurn: (newTurn: Players | null) => void,
	updateStatus: (newStatus: GameStatus) => void,
	clearAll: () => void;
}

type GameStoreType = GameState & GameActions;

export default GameStoreType;