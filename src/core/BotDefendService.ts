import TableService from '@/core/TableService.ts';
import { Random } from '@/utils/Random.ts';
import CardService from '@/core/CardService.ts';

import { IBotDefendService } from '@/types/core/IBotDefendService.ts';
import type { PossibleMoves, Card as CardType } from '@/types/GameTypes.ts';
import BotDefendStrategy from '@/core/BotDefendStrategy.ts';

const BotDefendService: IBotDefendService = {

	defend: (aiMode, gameData) => {
		const { hand, table, trumpCard } = gameData;

		if (!hand || !table || !trumpCard) throw Error(`gameData wrong!`);

		const unbeatenCards: CardType[] = TableService.getUnbeatenCards(table);

		const possibleMoves = BotDefendService.findPossibleDefendMoves(unbeatenCards, hand, trumpCard.suit);

		if (!possibleMoves) return;

		switch (aiMode) {
			case 'fool':
				return BotDefendService.foolDefend(possibleMoves, gameData);
			case 'easy':
				return BotDefendService.easyDefend(possibleMoves, gameData);
			case 'medium':
				return BotDefendService.mediumDefend(possibleMoves, gameData);
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
		const randomPossibleMoves = Random.getArrayElem<[string, string[]]>(
			Object.entries(possibleMoves),
		);

		if (!randomPossibleMoves) return undefined;

		const [chosenAttackCardId, defendCardIds] = randomPossibleMoves;

		const randomDefendId = Random.getArrayElem<string>(defendCardIds);
		if (!randomDefendId) return undefined;
		const chosenDefendCard = CardService.findCardById(hand, randomDefendId);

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},

	easyDefend: (possibleMoves, { hand, trumpCard }) => {
		const randomPossibleMoves = Random.getArrayElem<[string, string[]]>(
			Object.entries(possibleMoves),
		);

		if (!randomPossibleMoves) return undefined;

		const [chosenAttackCardId, defendCardIds] = randomPossibleMoves;

		const chosenDefendCard = CardService.getLowestCard(
			defendCardIds.map(cardId => CardService.findCardById(hand, cardId)),
			trumpCard.suit,
		);

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	},

	mediumDefend: (possibleMoves, gameData) => {
		const { hand, table } = gameData;

		if (BotDefendStrategy.shouldTakeTable(hand, table, possibleMoves, gameData)) {
			return undefined;  // взять
		}

		return BotDefendStrategy.chooseDefendCard(possibleMoves, gameData);
	},
};

export default BotDefendService;
