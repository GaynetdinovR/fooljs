import type { TableCardPair } from '@/types/store/TableStoreType.ts';
import type { TableCardObjectsPair } from '@/types/core/ITableService.ts';
import type { Card as CardType } from '@/types/GameTypes.ts';
import CardDatabase from '@/core/CardDatabase.ts';

export const resolveTablePairs = (table: TableCardPair[], actionType = undefined): TableCardObjectsPair[] => {
	console.log(table, actionType)
	// Хуйню передает Table.tsx
	return table.map(([attackId, defendId]) => {
		let attackCard;

		if(actionType === 'save'){
			attackCard = CardDatabase.tryGetCardById(attackId);
		} else {
			attackCard = CardDatabase.getCardById(attackId);
		}

		const defendCard: CardType | null = defendId
			? CardDatabase.getCardById(defendId)
			: null;

		return [attackCard, defendCard];
	});
};