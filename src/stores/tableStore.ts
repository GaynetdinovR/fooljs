import { create } from 'zustand/react';
import type TableStoreType from '@/types/store/TableStoreType.ts';
import Card from '@/ui/Card.tsx';
import { formatAttackCard } from '@/utils/utils.ts';

const INIT_STORE = {
	table: [],
};

const useTableStore = create<TableStoreType>((set, get) => ({
	...INIT_STORE,
	updateTable: (table: Card[]) => set(() => ({ table: table })),
	addAttackCard: (card) => {
		const formattedCard = formatAttackCard(card);

		set((state) => ({
			table: [...state.table, [formattedCard, null]],
		}));
	},
	addDefendCard: (cardAttackId, card) => {
		console.log();
		set((state) => ({
			table: state.table.map((pair) => {
				if (pair[0].id === cardAttackId) return [{ ...pair[0], isBeaten: true }, card];
				return pair;
			}),
		}));
	},
	clearAll: () => set(() => (INIT_STORE)),
}));

export const useTable = () => useTableStore(state => state.table);
export default useTableStore;