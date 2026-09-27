import { create } from 'zustand/react';
import type TableStoreType from '@/types/store/TableStoreType.ts';

const INIT_STORE = {
	table: [],
};

const useTableStore = create<TableStoreType>((set) => ({
	...INIT_STORE,
	updateTable: (table) => set(() => ({ table: table })),
	addAttackCard: (card) => {
		set((state) => ({
			table: [...state.table, [card, null]],
		}));
	},
	addDefendCard: (attackCardId, card) => {
		set((state) => ({
			table: state.table.map((pair) => {
				if (pair[0] === attackCardId) return [pair[0], card];
				return pair;
			}),
		}));
	},
	clearAll: () => set(() => INIT_STORE),
}));

export const useTable = () => useTableStore((state) => state.table);
export default useTableStore;
