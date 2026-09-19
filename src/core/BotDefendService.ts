import TableService from '@/core/TableService.ts';
import { Random } from '@/utils/Random.ts';
import CardService from '@/core/CardService.ts';

import { IBotDefendService } from '@/types/core/IBotDefendService.ts';
import type { TableCard } from '@/types/store/TableStoreType.ts';
import type { PossibleMoves } from '@/types/GameTypes.ts';

const BotDefendService: IBotDefendService = {

	defend: (aiMode, gameData) => {
		const { hand, table, trumpSuit } = gameData;

		if (!hand || !table || !trumpSuit) throw Error(`gameData wrong!`);

		const unbeatenCards: TableCard[] = TableService.getUnbeatenCards(table);

		const possibleMoves = BotDefendService.findPossibleDefendMoves(unbeatenCards, hand, trumpSuit);

		if (!possibleMoves) return;

		switch (aiMode) {
			case 'fool':
				return BotDefendService.foolDefend(possibleMoves, gameData);
			case 'easy':
				return BotDefendService.easyDefend(possibleMoves, gameData);
			default:
				return BotDefendService.foolDefend(possibleMoves, gameData);
		}
	},

	findPossibleDefendMoves: (attackCards, hand, trumpSuit) => {
		const possibleMoves: PossibleMoves = {};

		for (const attackCard of attackCards) {
			possibleMoves[attackCard.id] = [];

			for (const defendCard of hand) {
				if (!TableService.isPossibleToDefend(attackCard, defendCard, trumpSuit)) continue;

				possibleMoves[attackCard.id].push(defendCard.id);
			}
		}

		for (const cardId in possibleMoves) {
			if (possibleMoves[cardId].length === 0) return;
		}

		return possibleMoves;
	},

	foolDefend: (possibleMoves, { hand }) => {
		const [chosenAttackCardId, defendCardIds] = Random.getArrayElem<[string, string[]]>(
			Object.entries(possibleMoves),
		);

		const chosenDefendCard = CardService.findCardById(hand, Random.getArrayElem<string>(defendCardIds));

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},

	easyDefend: (possibleMoves, { hand, trumpSuit }) => {
		const [chosenAttackCardId, defendCards] = Random.getArrayElem(
			Object.entries(possibleMoves),
		);

		const chosenDefendCard = CardService.getLowestCard(
			defendCards.map(cardId => CardService.findCardById(hand, cardId)),
			trumpSuit
		);

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},
};

export default BotDefendService;
