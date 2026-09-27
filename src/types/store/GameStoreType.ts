import type { GameResults, GameSettings, GameStatus, Players } from '@/types/GameTypes.ts';

interface GameState {
	settings: GameSettings;
	status: GameStatus;
	turn: Players | null;
	moveNumber: number;
}

interface GameActions {
	updateSettings: (newSettings: GameSettings) => void;
	updateTurn: (newTurn: Players | null) => void;
	updateStatus: (newStatus: GameStatus) => void;
	updateStats: (newStats: { settings: GameSettings; result: GameResults }) => void;
	incrementMoveNumber: (number: number) => void;
	clearAll: () => void;
}

type GameStoreType = GameState & GameActions;

export default GameStoreType;
