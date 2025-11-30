import TableService from '@/core/TableService.ts';
import Random from '@/utils/Random.ts';
import type { Card } from '@/types/GameTypes.ts';
import CardService from '@/core/CardService.ts';
import type IBotAttackService from '@/types/core/IBotAttackService.ts';

class BotAttackService implements IBotAttackService {
	static attack = (aiMode, gameData): Card | null => {
		switch (aiMode) {
			case 'fool':
				return this.foolAttack(gameData);
			case 'easy':
				return this.easyAttack(gameData);
			// case 'medium':
			// 	return this.mediumAttack(gameData);
			default:
				return this.foolAttack(gameData);
		}
	}

	private static findPossibleAttackMoves = (hand, table, humanHandCount) => {
		const possibleMoves: Card[] = [];

		for (const card of hand) {
			if (!TableService.isPossibleToAttack(card, table, humanHandCount)) continue;

			possibleMoves.push(card);
		}

		return possibleMoves;
	}

	private static foolAttack = ({ hand, table, humanHandCount }) => {
		const possibleMoves = this.findPossibleAttackMoves(hand, table, humanHandCount);

		if(!possibleMoves) return null

		return Random.getArrayElem(possibleMoves);
	}

	private static easyAttack = ({ hand, table, humanHandCount, trumpSuit }): Card | null  => {
		const possibleMoves = this.findPossibleAttackMoves(hand, table, humanHandCount);

		if(!possibleMoves) return null

		return CardService.getLowestNonTrump(possibleMoves, trumpSuit);
	}

	//private static mediumAttack = ({ hand, table, humanHandCount }): Card | null  => {}
}

export default BotAttackService;