import type { Card } from '@/types/GameTypes.ts';
import TableService from '@/core/TableService.ts';
import Random from '@/utils/Random.ts';
import CardService from '@/core/CardService.ts';

type DefendCardWithId = Card & { attackCardId: string }

export type PossibleMoves = {
	[key: string]: string[],
}

class BotDefendService implements IBotDefendService {
	static defend = (aiMode, gameData): DefendCardWithId | null => {
		switch (aiMode) {
			case 'easy':
				return this.easyDefend(gameData);
			default:
				return this.easyDefend(gameData);
		}
	};

	private static findPossibleDefendMoves = (attackCards, hand, trumpSuit): PossibleMoves => {
		const possibleMoves: PossibleMoves = {};

		for (const attackCard of attackCards) {
			possibleMoves[attackCard.id] = [];

			for (const defendCard of hand) {
				if (!TableService.isPossibleToDefend(attackCard, defendCard, trumpSuit)) continue;

				possibleMoves[attackCard.id].push(defendCard.id);
			}
		}

		return possibleMoves;
	};

	private static easyDefend = ({ hand, table, trumpSuit }): DefendCardWithId | null => {
		if (!hand || !table || !trumpSuit) throw Error(`gameData wrong!`);

		const unbeatenCards = TableService.getUnbeatenCards(table);

		const possibleMoves = this.findPossibleDefendMoves(unbeatenCards, hand, trumpSuit);

		for(const cardId in possibleMoves){
			if(possibleMoves[cardId].length == 0) return null;
		}

		const [chosenAttackCardId, defendCards] = Random.getArrayElem(Object.entries(possibleMoves));

		const chosenDefendCard = CardService.findCardById(hand, Random.getArrayElem(defendCards));

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId,
		};
	};

}

export default BotDefendService;