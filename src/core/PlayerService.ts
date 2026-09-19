import { Random } from '@/utils/Random.ts';
import CardService from '@/core/CardService.ts';

import { PLAYERS } from '@/data/constants.ts';

import type { Card, Players, Suits } from '@/types/GameTypes.ts';

type IPlayerService = {
	/**
	 * Находит первого атакующего игрока в начале игры, по меньшему козырю/случайно
	 * @param humanHand
	 * @param botHand
	 * @param trumpSuit
	 */
	findWhoseFirstTurn: (humanHand: Card[], botHand: Card[], trumpSuit: Suits) => Players
	/**
	 * Возвращает другого игрока
	 */
	getAnotherPlayer: (currentPlayer: Players) => Players
}

const PlayerService: IPlayerService = {

	findWhoseFirstTurn: (humanHand, botHand, trumpSuit) => {
		const humanLowestTrump = CardService.findLowestSuit(humanHand, trumpSuit);
		const botLowestTrump = CardService.findLowestSuit(botHand, trumpSuit);

		if (humanLowestTrump && botLowestTrump) {
			return humanLowestTrump.power < botLowestTrump.power ? 'human' : 'bot';
		}

		if (humanLowestTrump) return 'human';
		if (botLowestTrump) return 'bot';

		return Random.getArrayElem<Players>(PLAYERS);
	},

	getAnotherPlayer: (currentPlayer: Players): Players => {
		return currentPlayer === 'bot' ? 'human' : 'bot';
	},
};

export default PlayerService;
