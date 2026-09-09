import TableService from '@/core/TableService.ts';
import Random from '@/utils/Random.ts';
import CardService from '@/core/CardService.ts';
import type IBotDefendService from '@/types/core/IBotDefendService.ts';
import type { PossibleMoves } from '@/types/GameTypes.ts';

const BotDefendService: IBotDefendService = {

	defend: (aiMode, gameData) => {
		const { hand, table, trumpSuit } = gameData

		if (!hand || !table || !trumpSuit) throw Error(`gameData wrong!`);

		const unbeatenCards = TableService.getUnbeatenCards(table);

		const possibleMoves = BotDefendService._findPossibleDefendMoves(unbeatenCards, hand, trumpSuit);

		if (!possibleMoves) return null

		switch (aiMode) {
			case 'fool':
				return BotDefendService._foolDefend(possibleMoves, gameData);
			case 'easy':
				return BotDefendService._easyDefend(possibleMoves, gameData);
			default:
				return BotDefendService._foolDefend(possibleMoves, gameData);
		}
	},

	_findPossibleDefendMoves: (attackCards, hand, trumpSuit) => {
		const possibleMoves: PossibleMoves = {};

		for (const attackCard of attackCards) {
			possibleMoves[attackCard.id] = [];

			for (const defendCard of hand) {
				if (!TableService.isPossibleToDefend(attackCard, defendCard, trumpSuit)) continue;

				possibleMoves[attackCard.id].push(defendCard.id);
			}
		}

		for (const cardId in possibleMoves) {
			if (possibleMoves[cardId].length === 0) return null;
		}

		return possibleMoves;
	},

	_foolDefend: (possibleMoves, { hand }) => {
		const [chosenAttackCardId, defendCards] = Random.getArrayElem(
			Object.entries(possibleMoves)
		);

		const chosenDefendCard = CardService.findCardById(hand, Random.getArrayElem(defendCards));

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},

	_easyDefend: (possibleMoves, { hand, trumpSuit }) => {
		const [chosenAttackCardId, defendCards] = Random.getArrayElem(
			Object.entries(possibleMoves)
		);

		const chosenDefendCard = CardService.getLowestCardById(hand, defendCards, trumpSuit)

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},

}

export default BotDefendService;
