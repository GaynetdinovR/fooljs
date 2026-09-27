import { create } from 'zustand/react';
import type FallStoreType from '@/types/store/FallStoreType.ts';

const INIT_STORE = {
	fall: [],
};

const useFallStore = create<FallStoreType>((set) => ({
	...INIT_STORE,
	updateFall: (fall) => set(() => ({ fall: fall })),
	moveToFall: (cards) => set((state) => ({ fall: [...state.fall, ...cards] })),
	clearAll: () => set(() => INIT_STORE),
}));
export const useFall = () => useFallStore((state) => state.fall);
export default useFallStore;
