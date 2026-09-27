import CardService from '@/core/CardService.ts';
import type { ITableService } from '@/types/core/ITableService.ts';
import type { CardId, Card as CardType } from '@/types/GameTypes.ts';

const TableService: ITableService = {

	isPossibleToAttack: (card, table, defenderCardsCount) => {
		if (table.length === 0 && defenderCardsCount !== 0) return true;

		const conditions = {
			isCardValueOnTable: false,
			isWithinAttackLimit: false,
		};

		const allTableCards: CardType[] = table.flat();

		const tableCardValues = CardService.getUniqCardValues(allTableCards);
		const unbeatenCardsCount = table.filter((pair) => !pair[1]).length;

		if (unbeatenCardsCount < defenderCardsCount) conditions.isWithinAttackLimit = true;

		if (tableCardValues.includes(card.power)) conditions.isCardValueOnTable = true;

		return conditions.isWithinAttackLimit && conditions.isCardValueOnTable;
	},

	isPossibleToDefend: (attackCard, defendCard, trumpSuit) => {
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
	},

	isTableBeaten: (table) => {
		return (TableService.getUnbeatenCards(table).length === 0);
	},

	getUnbeatenCards: (table) => {
		const unbeatenCards: CardType[] = [];

		table.forEach(([attackCard, defendCard]) => {
			if (!defendCard) unbeatenCards.push(attackCard);
		});

		return unbeatenCards;
	},

	getAllAttackCards: (table) => {
		const attackCards: CardId[] = [];

		for (const [attackCard] of table) {
			attackCards.push(attackCard);
		}

		return attackCards;
	},

	getAllCards: (table) => {
		return table.flat().filter((card): card is CardId => card);
	},
};

export default TableService;
