import type {
	GameResults,
	GameSettings,
	GameStatus,
	Players,
} from '@/types/GameTypes.ts';

export interface GameState {
	settings: GameSettings;
	status: GameStatus;
	turn: Players | undefined;
	moveNumber: number;
	stats: {
		settings: GameSettings | undefined;
		result: GameResults;
	};
}

export type NewSettings = Partial<GameSettings>;

interface GameActions {
	updateSettings: (newSettings: NewSettings) => void;
	updateTurn: (newTurn: Players | undefined) => void;
	updateStatus: (newStatus: GameStatus) => void;
	updateStats: (newStats: { settings: GameSettings; result: GameResults }) => void;
	incrementMoveNumber: (number: number) => void;
	clearAll: () => void;
}

type GameStoreType = GameState & GameActions;

export default GameStoreType;
