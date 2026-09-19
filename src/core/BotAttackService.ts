import TableService from '@/core/TableService.ts';
import CardService from '@/core/CardService.ts';

import { Random } from '@/utils/Random.ts';

import type { Card as CardType } from '@/types/GameTypes.ts';
import type { IBotAttackService } from '@/types/core/IBotAttackService.ts';

const BotAttackService: IBotAttackService = {
	attack: (aiMode, gameData) => {
		const { hand, table, humanHandCount, trumpSuit } = gameData;

		if (!hand || !table || !trumpSuit) throw Error(`gameData wrong!`);

		const possibleMoves = BotAttackService.findPossibleAttackMoves(hand, table, humanHandCount);

		if (possibleMoves.length === 0) return;

		switch (aiMode) {
			case 'fool':
				return BotAttackService.foolAttack(possibleMoves, gameData);
			case 'easy':
				return BotAttackService.easyAttack(possibleMoves, gameData);
			default:
				return BotAttackService.foolAttack(possibleMoves, gameData);
		}
	},

	findPossibleAttackMoves: (hand, table, humanHandCount) => {
		const possibleMoves: CardType[] = [];

		for (const card of hand) {
			if (!TableService.isPossibleToAttack(card, table, humanHandCount)) continue;

			possibleMoves.push(card);
		}

		return possibleMoves;
	},

	foolAttack: (possibleMoves) => {
		return Random.getArrayElem<CardType>(possibleMoves);
	},

	easyAttack: (possibleMoves, { trumpSuit }) => {
		return CardService.getLowestCard(possibleMoves, trumpSuit);
	},
};

export default BotAttackService;
