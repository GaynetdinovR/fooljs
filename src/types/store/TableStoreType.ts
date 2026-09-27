import type { CardId } from '@/types/GameTypes.ts';

export type TableCardPair = [CardId, CardId | null];
interface TableState {
	table: TableCardPair[];
}

interface TableActions {
	updateTable: (table: TableCardPair[]) => void;
	addAttackCard: (card: CardId) => void;
	addDefendCard: (attackCardId: CardId, card: CardId) => void;
	clearAll: () => void;
}

type TableStoreType = TableState & TableActions;

export default TableStoreType;
