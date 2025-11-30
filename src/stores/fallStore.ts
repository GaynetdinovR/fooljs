import { create } from 'zustand/react';
import type FallStoreType from '@/types/store/FallStoreType.ts';
import Card from '@/ui/Card.tsx';

const INIT_STORE = {
	fall: [],
};

const useFallStore = create<FallStoreType>((set) => ({
	...INIT_STORE,
	updateFall: (fall: Card[]) => set(() => ({ fall: fall })),
	moveToFall: (cards: Card[]) => set((state) => ({ fall: [...state.fall, ...cards] })),
	clearAll: () => set(() => (INIT_STORE)),
}));
export const useFall = () => useFallStore(state => state.fall);
export default useFallStore;