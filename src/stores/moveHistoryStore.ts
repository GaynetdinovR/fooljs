import { create } from 'zustand/react';
import { devtools } from 'zustand/middleware';
import MoveHistoryType from '@/types/store/MoveHistoryType.ts';

const INIT_STORE = {
	history: [],
};

const useMoveHistoryStore = create<MoveHistoryType>()(
	devtools(
		(set) => ({
			...INIT_STORE,
			addMoveToHistory: (move) => set((state) => ({ history: [...state.history, move] })),
			updateHistory: (history) => set(() => ({ history: history })),
			clearAll: () => set(() => ({ ...INIT_STORE })),
		}),
	),
);

export default useMoveHistoryStore;
