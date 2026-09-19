import type { AiModeType, BotGameData, Card as CardType, PossibleMoves, Suits } from '@/types/GameTypes.ts';

type DefendCardWithId = CardType & { attackCardId: string };

export type IBotDefendService = {
	/**
	 * Общий метод защиты
	 * @param aiMode
	 * @param gameData
	 */
	defend: (aiMode: AiModeType, gameData: BotGameData) => DefendCardWithId | undefined,
	/**
	 * Находит пары возможных ходов при защите,
	 * На каждую не отбитую карту - возможные ходы защиты
	 * Если ходов защиты нет, то undefined
	 * @param attackCards
	 * @param hand
	 * @param trumpSuit
	 */
	findPossibleDefendMoves: (attackCards: CardType[], hand: CardType[], trumpSuit: Suits) => PossibleMoves | undefined,
	/**
	 * Защита случайной картой (очень легкий уровень бота)
	 * @param possibleMoves
	 * @param gameData
	 */
	foolDefend: (possibleMoves: PossibleMoves, gameData: BotGameData) => DefendCardWithId | undefined,
	/**
	 * Защита наименьшей картой (легкий уровень бота)
	 * @param possibleMoves
	 * @param gameData
	 */
	easyDefend: (possibleMoves: PossibleMoves, gameData: BotGameData) => DefendCardWithId | undefined,
}
