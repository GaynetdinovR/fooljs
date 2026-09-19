import { Card as CardType, Suits } from '@/types/GameTypes.ts';
import type { TableCard, TableCardPair } from '@/types/store/TableStoreType.ts';

export type ITableService = {
	/**
	 * Возвращает значение: возможна ли атака по правилам игры
	 */
	isPossibleToAttack: (card: CardType, table: TableCardPair[], defenderCardsCount: number) => boolean;

	/**
	 * Возвращает значение: возможна ли защита по правилам игры
	 */
	isPossibleToDefend: (attackCard: CardType, defendCard: CardType, trumpSuit: Suits) => boolean;

	/**
	 * Возвращает значение: побиты ли все карты стола
	 */
	isTableBeaten: (table: TableCardPair[]) => boolean;

	/**
	 * Возвращает НЕ битые карты со стола
	 */
	getUnbeatenCards: (table: TableCardPair[]) => TableCard[];

	/**
	 * Возвращает все карты стола
	 */
	getAllCards: (table: TableCardPair[]) => CardType[];
};