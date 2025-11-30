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

	static isPossibleToDefend = (attackCard, defendCard, trumpSuit) => {
		const conditions = {
			isCardToBeatTrump: attackCard.suit === trumpSuit,
			isCardToDefendTrump: defendCard.suit === trumpSuit,
			isDefendStrongerThanAttack: defendCard.power > attackCard.power,
			isSameSuit: defendCard.suit === attackCard.suit,
		};

		if (conditions.isCardToDefendTrump && !conditions.isCardToBeatTrump) return true;

		if (conditions.isCardToDefendTrump && conditions.isCardToBeatTrump) {
			return conditions.isDefendStrongerThanAttack;
		}

		if (conditions.isSameSuit) {
			return conditions.isDefendStrongerThanAttack;
		}

		return false;
	}

	static isTableBeaten = (table) => {
		for(const [attackCard, defendCard] of table){
			if(!attackCard.isBeaten && defendCard === null) return false;
		}

		return true;
	}

	static getUnbeatenCards = (table: TableCardPair[]) : TableCard[] => {
		const unbeatenCards = [];

		table.forEach((cardPair) => {
			const attackCard = cardPair[0];

			if(!attackCard.isBeaten) unbeatenCards.push(attackCard);
		})

		return unbeatenCards;
	}

	static getAllCards = (table) => {
		return table.flat().filter((card) => card);
	}
}

export default TableService;