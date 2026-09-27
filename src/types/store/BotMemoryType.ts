import type { Card, Players } from '@/types/GameTypes.ts';

interface BotMemoryState {
	/**
	 * Карты, которые игрок поднял
	 */
	raisedCards: Card[];
	/**
	 * Карты, находящиеся гарантированно у игрока
	 */
	knownHumanCards: Card[];
	/**
	 * Информация об игре
	 */
	gameProgress: GameProgress
}

type GameProgress = {
	moves: number,
	humanAttacks: number,
	botAttacks: number,
	firstTurn: Players | undefined,
}

export interface BotMemoryActions {
	/** Заменить массив поднятых карт целиком */
	updateRaisedCards: (raisedCards: Card[]) => void;
	/** Добавить карты в поднятые */
	addRaisedCards: (raisedCards: Card[]) => void;

	/** Заменить массив известных карт игрока целиком */
	updateKnownHumanCards: (knownHumanCards: Card[]) => void;
	/** Добавить известные карты игрока */
	addKnownHumanCards: (knownHumanCards: Card[]) => void;

	/** Увеличить счётчик ходов (по умолчанию на 1) */
	addMoves: (count?: number) => void;
	/** Увеличить счётчик атак игрока (по умолчанию на 1) */
	addHumanAttacks: (count?: number) => void;
	/** Увеличить счётчик атак бота (по умолчанию на 1) */
	addBotAttacks: (count?: number) => void;

	/** Установить первого ходившего игрока */
	addFirstTurn: (player: Players) => void;

	// ─── gameProgress: полная замена ───
	/** Заменить весь объект gameProgress */
	updateGameProgress: (gameProgress: GameProgress) => void;

	// ─── Общее ───
	/** Полностью очистить память бота */
	clearAll: () => void;
}

type BotMemoryType = BotMemoryState & BotMemoryActions;

export default BotMemoryType;
