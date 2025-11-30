import type { Card } from '@/types/GameTypes.ts';

export type TableCard = Card & {isBeaten: boolean}

export type TableCardPair = [TableCard, TableCard];
interface TableState {
	table: TableCardPair[];
}

interface TableActions {
	updateTable: (table: TableCard[]) => void;
	addAttackCard: (card: Card) => void;
	addDefendCard: (attackCardId: string, card: Card) => void;
	clearAll: () => void;
}

type TableStoreType = TableState & TableActions

export default TableStoreType;
