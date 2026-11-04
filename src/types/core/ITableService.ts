import { Card as CardType, CardId, Suits } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

export type TableCardObjectsPair = [CardType, CardType | undefined];

export type AttackContext = {
	tableCardValues: Set<number>,
	unbeatenCount: number,
	isTableEmpty: boolean,
};

export type ITableService = {
	/**
	 * Возвращает значение: возможна ли атака по правилам игры
	 */
	isPossibleToAttackFast: (card: CardType, ctx: AttackContext, defenderCardsCount: number) => boolean;
	/**
	 * Возвращает значение: возможна ли атака по правилам игры
	 * (оставлена для совместимости)
	 */
	isPossibleToAttack: (card: CardType, table: TableCardObjectsPair[], defenderCardsCount: number) => boolean;

	/**
	 * Возвращает значение: возможна ли защита по правилам игры
	 */
	isPossibleToDefend: (attackCard: CardType, defendCard: CardType, trumpSuit: Suits) => boolean;

	/**
	 * Возвращает значение: побиты ли все карты стола
	 */
	isTableBeaten: (table: TableCardObjectsPair[]) => boolean;

	/**
	 * Возвращает НЕ битые id карт со стола
	 */
	getUnbeatenCards: (table: TableCardObjectsPair[]) => CardType[];

	/**
	 * Возвращает все id карт стола
	 */
	getAllCards: (table: TableCardPair[]) => CardId[];

	/**
	 * Возвращает все id атакующих карт стола
	 */
	getAllAttackCards: (table: TableCardPair[]) => CardId[];

	getAllTableCards: (table: TableCardObjectsPair[]) => CardType[];

	/**
	 * Подготовка контекста для функции isPossibleToAttackFast
	 * @param table
	 */
	prepareAttackContext: (table: TableCardObjectsPair[]) => AttackContext;
};