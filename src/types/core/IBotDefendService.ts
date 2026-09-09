import type { AiModeType, Card, PossibleMoves, Suits } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

type DefendCardWithId = Card & { attackCardId: string };

type GameDataType = {
	hand: Card[]
	trumpSuit: Suits
	table: TableCardPair[]
}

interface IBotDefendService {
	/**
	 * Общий метод защиты
	 * @param aiMode
	 * @param gameData
	 */
	defend: (aiMode: AiModeType, gameData: GameDataType) => DefendCardWithId | null;

	/**
	 * Находит пары возможных ходов при защите
	 * На каждую не отбитую карту - возможные ходы защиты
	 * Если ходов защиты нет, то null
	 * @param attackCards
	 * @param hand
	 * @param trumpSuit
	 * @private
	 */
	_findPossibleDefendMoves: (attackCards: Card[], hand: Card[], trumpSuit: Suits) => PossibleMoves | null;

	/**
	 * Защита случайной картой (очень легкий уровень бота)
	 * @param possibleMoves
	 * @param hand
	 * @private
	 */
	_foolDefend: (possibleMoves: PossibleMoves, gameData: GameDataType) => DefendCardWithId;

	/**
	 * Защита наименьшей картой (легкий уровень бота)
	 * @param possibleMoves
	 * @param hand
	 * @param trumpSuit
	 * @private
	 */
	_easyDefend: (possibleMoves: PossibleMoves, gameData: GameDataType) => DefendCardWithId;
}

export default IBotDefendService;