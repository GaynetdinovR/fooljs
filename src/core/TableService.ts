import type { ITableService } from '@/types/core/ITableService.ts';
import type { CardId, Card as CardType } from '@/types/GameTypes.ts';


const TableService: ITableService = {

	prepareAttackContext: (table) => {
		const tableCardValues = new Set<number>();
		let unbeatenCount = 0;

		for (const [attack, defend] of table) {
			tableCardValues.add(attack.power);
			if (defend) {
				tableCardValues.add(defend.power);
			} else {
				unbeatenCount++;
			}
		}

		return {
			tableCardValues,
			unbeatenCount,
			isTableEmpty: table.length === 0,
		};
	},

	isPossibleToAttackFast: (card, ctx, defenderCardsCount) => {
		if (ctx.isTableEmpty && defenderCardsCount !== 0) return true;

		if (ctx.unbeatenCount >= defenderCardsCount) return false;

		return ctx.tableCardValues.has(card.power);
	},

	isPossibleToAttack: (card, table, defenderCardsCount) => {
		const ctx = TableService.prepareAttackContext(table);
		return TableService.isPossibleToAttackFast(card, ctx, defenderCardsCount);
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

		for (const [attackCard, defendCard] of table) {
			if (!defendCard) unbeatenCards.push(attackCard);
		}

		return unbeatenCards;
	},

	getAllAttackCards: (table) => {
		const attackCards: CardId[] = [];

		for (const [attackCard] of table) {
			attackCards.push(attackCard);
		}

		return attackCards;
	},

	getAllTableCards: (table) => {
		const cards: CardType[] = [];

		for (const [attackCard, defendCard] of table) {
			cards.push(attackCard);
			if (defendCard) cards.push(defendCard);
		}

		return cards;
	},

	getAllCards: (table) => {
		const cards: CardId[] = [];

		for (const [attackCard, defendCard] of table) {
			cards.push(attackCard);
			if (defendCard) cards.push(defendCard);
		}

		return cards;
	},
};

export default TableService;
