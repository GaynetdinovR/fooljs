import type { Move } from '../../src/types/store/MoveHistoryType.ts';
import type { SimMove, SimPlayers } from '../types/SimGameTypes.ts';
import type { Players } from '../../src/types/GameTypes';

/**
 * Преобразует SimPlayers в Players для совместимости с core/
 */
const toCorePlayer = (p: SimPlayers): Players =>
	p === 'agentA' ? 'human' : 'bot';

/**
 * Конвертирует один SimMove в Move.
 */
const resolveOneMove = (m: SimMove): Move => ({
	moveNumber: m.moveNumber,
	player: toCorePlayer(m.player),
	action: m.action,
	cardIds: m.cardIds,
	attackCardId: m.attackCardId,
});

let cachedHistory: Move[] = [];

/**
 * Инкрементально конвертирует SimMove[] → Move[].
 *
 * Если история выросла — конвертирует только новые элементы.
 * Если история уменьшилась (новая партия) — пересобирает с нуля.
 */
export const toCoreHistory = (history: SimMove[]): Move[] => {
	if (history.length < cachedHistory.length) {
		cachedHistory = history.map(resolveOneMove);
		return cachedHistory;
	}

	if (history.length === cachedHistory.length) {
		return cachedHistory;
	}

	for (let i = cachedHistory.length; i < history.length; i++) {
		cachedHistory.push(resolveOneMove(history[i]));
	}

	return cachedHistory;
};

export const resetCoreHistoryCache = (): void => {
	cachedHistory = [];
};