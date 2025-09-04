import CardService from '@/core/CardService.ts';
import type { Card } from '@/types/GameTypes.ts';
import type { TableCardPair, TableCard } from '@/types/store/TableStoreType.ts';

class TableService {
	static isPossibleToAttack = (card: TableCard, table: TableCardPair[], defenderCardsCount: Card[]) => {
		if (table.length === 0 && defenderCardsCount !== 0) return true;

		const conditions = {
			isCardValueOnTable: false,
			isWithinAttackLimit: false
		}

		const allTableCards: TableCard[] = table.flat();

		const tableCardValues = CardService.getUniqCardValues(allTableCards);
		const unbeatenCardsCount = table.filter((pair) => !pair[0].isBeaten).length;

		if(unbeatenCardsCount < defenderCardsCount) conditions.isWithinAttackLimit = true;

		if(tableCardValues.includes(card.power)) conditions.isCardValueOnTable = true;

		return conditions.isWithinAttackLimit && conditions.isCardValueOnTable;
	}
}

export default TableService;