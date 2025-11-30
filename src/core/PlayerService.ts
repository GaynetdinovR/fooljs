import type IPlayerService from '@/types/core/IPlayerService.ts';
import CardService from '@/core/CardService.ts';
import type { Card, Players, Suits } from '@/types/GameTypes.ts';
import Random from '@/utils/Random.ts';
import { PLAYERS } from '@/data/constants.ts';

class PlayerService implements IPlayerService {
	/**
	 * Находит первого атакующего игрока в начале игры, по меньшему козырю/случайно
	 * @param humanHand
	 * @param botHand
	 * @param trumpSuit
	 */
	static findWhoseFirstTurn = (humanHand: Card[], botHand: Card[], trumpSuit: Suits): Players => {
		const humanLowestTrump = CardService.findLowestSuit(humanHand, trumpSuit);
		const botLowestTrump = CardService.findLowestSuit(botHand, trumpSuit);

		if (humanLowestTrump && botLowestTrump) {
			return humanLowestTrump.power < botLowestTrump.power ? 'human' : 'bot';
		}

		if (humanLowestTrump) return 'human';
		if (botLowestTrump) return 'bot';

		return Random.getArrayElem<Players>(PLAYERS);
	}

	// Возвращает другого игрока
	static getAnotherPlayer = (currentPlayer: Players): Players => {
		return (currentPlayer === 'bot') ? 'human' : 'bot'
	}
}

export default PlayerService;