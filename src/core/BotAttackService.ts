import TableService from '@/core/TableService.ts';
import CardService from '@/core/CardService.ts';

import { Random } from '@/utils/Random.ts';

import type { Card as CardType } from '@/types/GameTypes.ts';
import type { IBotAttackService } from '@/types/core/IBotAttackService.ts';
import BotAttackStrategy from '@/core/BotAttackStrategy.ts';

const BotAttackService: IBotAttackService = {
	attack: (aiMode, gameData) => {
		const { hand, table, opponentHandCount, trumpCard } = gameData;

		if (!hand || !table || !trumpCard || opponentHandCount === undefined) {
			throw Error(`gameData wrong!`);
		}

		const possibleMoves = BotAttackService.findPossibleAttackMoves(hand, table, opponentHandCount);

		if (possibleMoves.length === 0) return;

		switch (aiMode) {
			case 'fool':
				return BotAttackService.foolAttack(possibleMoves);
			case 'easy':
				return BotAttackService.easyAttack(possibleMoves, gameData);
			case 'medium':
				return BotAttackService.mediumAttack(possibleMoves, gameData);
			default:
				return BotAttackService.foolAttack(possibleMoves);
		}
	},

	findPossibleAttackMoves: (hand, table, opponentHandCount) => {
		const possibleMoves: CardType[] = [];
		const ctx = TableService.prepareAttackContext(table);

		for (const card of hand) {
			if (!TableService.isPossibleToAttackFast(card, ctx, opponentHandCount)) continue;

			possibleMoves.push(card);
		}

		return possibleMoves;
	},

	foolAttack: (possibleMoves) => {
		return Random.getArrayElem<CardType>(possibleMoves);
	},

	easyAttack: (possibleMoves, { trumpCard }) => {
		return CardService.getLowestCard(possibleMoves, trumpCard.suit);
	},

	mediumAttack: (possibleMoves, gameData) => {
		return BotAttackStrategy.chooseCardToAttackByPriority(possibleMoves, gameData);
	},
};

export default BotAttackService;
