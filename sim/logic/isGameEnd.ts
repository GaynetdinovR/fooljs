import GameConditions from '../../src/core/GameConditions.ts';
import type { SimState } from '../types/SimGameTypes';

export const isGameEnd = (state: SimState): boolean => {
	return GameConditions.isGameEnd({
		table: state.table,
		deckLength: state.deck.length,
		handA: state.agentA,
		handB: state.agentB,
	});
};