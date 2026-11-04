import { SIM_GAME_STATUS } from '../simConstants';
import { getOpponent } from '../services/SimPlayerService';
import { isTableBeatenByIds } from '../logic/isTableBeatenByIds';
import type { SimPlayers, SimState } from '../types/SimGameTypes';

export const getActiveAgent = (state: SimState): SimPlayers => {
	const { status, turn, table } = state;

	const isTableBeatenCond = isTableBeatenByIds(table);

	if (status === 'init' || status === 'game-over') return;

	if (status === SIM_GAME_STATUS.ATTACK(turn) && isTableBeatenCond) return turn;
	if (status === SIM_GAME_STATUS.ATTACK(turn) && !isTableBeatenCond) return getOpponent(turn);

	if (status === SIM_GAME_STATUS.RAISE(turn)) return turn;
};
