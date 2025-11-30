import { create } from 'zustand/react';
import type BotMemoryType from '@/types/store/BotMemoryType.ts';

const INIT_STORE = {
	/* Запоминание:
		1. Поднятых карт
		2. Пары ушедших карт(атакующая и защищающаяся)
 	*/
	raisedCards: [],
	beatenCards: [],
	gameProgress: {
		moves: 0,
		humanAttacks: 0,
		botAttacks: 0,
		firstMove: null,
	}
};

const useBotMemoryStore = create<BotMemoryType>((set, get) => ({
	...INIT_STORE,
	updateRaisedCards: (raisedCards) => set(() => ({raisedCards: raisedCards})),
	addRaisedCards: (raisedCards) => set((state) => ({ raisedCards: [...state.raisedCards, ...raisedCards] })),
	addBeatenCards: (beatenCards) => set((state) => ({ beatenCards: [...state.beatenCards, ...beatenCards] })),
	clearAll: () => set(() => (INIT_STORE)),
}));

export default useBotMemoryStore;