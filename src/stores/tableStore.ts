import { create } from 'zustand/react';
import type TableStoreType from '@/types/store/TableStoreType.ts';
import Card from '@/ui/Card.tsx';
import { formatCardToBeat } from '@/utils/utils.ts';

const INIT_STORE = {
	table:[],
}

const useTableStore = create<TableStoreType>((set, get) => ({
	...INIT_STORE,
	updateTable: (table: Card[]) => set(() => ({ table: table })),
	addCardToBeat: (card) => {
		const formattedCard = formatCardToBeat(card);

		set((state) => ({
			table: [...state.table, [formattedCard, null]]
		}));
	},
	clearAll: () => set(() => (INIT_STORE))
}));

export const useTable = () => useTableStore(state => state.table);
export default useTableStore;