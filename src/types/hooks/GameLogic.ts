import type { GameResults, Players } from '@/types/GameTypes.ts';

export type GameLogic = {
	/**
	 * Действия при начале игры
	 */
	startGameActions: () => void;
	/**
	 * Действия при окончании хода
	 * TODO: setTimeout - костыль для уменьшения синхронности, чтобы контроллер успел словить статус
	 */
	moveToFallActions: () => Promise<void>;
	/**
	 * Действия при поднятии карт игроком
	 */
	raiseActions: (player: Players) => void;
	/**
	 * Действия при конце игры
	 */
	endGameActions: () => void;
	/**
	 * Действия, при конце подкидки карт(тому, кто поднимает)
	 * TODO: карты раздаются прежде чем карты берутся со стола
	 */
	endMoveActions: (attackingPlayer: Players) => void;
	/**
	 * Возвращает победителя
	 */
	getGameResults: () => GameResults;
};