import { create } from 'zustand/react';
import type GameStoreType from '@/types/store/GameStoreType.ts';

const INIT_STORE = {
	settings: {
		aiMode: 'medium',
		cardsCount: 36,
		gameMode: 'throw-in',
	},
	status: 'in-menu',
	turn: null,
};

const useGameStore = create<GameStoreType>((set) => ({
	...INIT_STORE,
	updateSettings: (newSettings) =>
		set((state) => ({
			settings: { ...state.settings, ...newSettings },
		})),
	updateTurn: (newTurn) =>
		set(() => ({
			turn: newTurn,
		})),
	updateStatus: (newStatus) =>
		set(() => ({
			status: newStatus,
		})),
	clearAll: () => set(() => ({ ...INIT_STORE })),
}));

export const useSettings = () => useGameStore(state => state.settings);
export const useTurn = () => useGameStore(state => state.turn);
export const useStatus = () => useGameStore(state => state.status);

export default useGameStore;