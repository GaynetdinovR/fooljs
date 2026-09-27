import type { Card as CardType, CardId, CardsCountType } from '@/types/GameTypes.ts';

type ICardDatabase = {
	/**
	 * Инициализирует базу карт на начало партии
	 */
	initCurrent: (cardsCount: CardsCountType) => void;
	/**
	 * Возвращает используемую базу карт
	 */
	getCurrent: () => Map<CardId, CardType>;
	/**
	 * Возвращает все id используемых карт
	 */
	getCurrentIds: () => CardId[];
	/**
	 * Составляет уникальный id карты
	 */
	buildId: (value: string, suit: string) => string;

	/**
	 * Возвращает путь к изображению карты
	 */
	getPath: (value: string, suit: string) => string;

	/**
	 * Собирает объект карты
	 */
	buildCardInfo: (value: string, suit: string, cardsCount: CardsCountType) => CardType;

	/**
	 * Создает и возвращает базу карт
	 */
	createCardsDatabase: (cardsCount: CardsCountType) => Map<CardId, CardType>;
	/**
	 * Возвращает базу карт
	 */
	getCardsDatabase: (cardsCount: CardsCountType) => Map<CardId, CardType>;
	/**
	 * Возвращает карту из базы
	 */
	getCardById: (cardId: CardId) => CardType;
	/**
	 * Возвращает несколько карт из базы
	 */
	getCardsById: (cardIds: CardId[]) => CardType[];
	/**
	 * Безопасный близнец
	 */
	tryGetCardById: (cardId: CardId) => CardType | undefined;
	/**
	 * Безопасный близнец
	 */
	tryGetCardsById: (cardIds: CardId[]) => CardType[] | undefined;
}

export default ICardDatabase;