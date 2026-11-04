import CardDatabase from '../../src/core/CardDatabase';
import type { SimState } from '../types/SimGameTypes';
import { findWhoseFirstTurn } from '../services/SimPlayerService';
import { SIM_GAME_STATUS } from '../simConstants';

export const setFirstTurn = (state: SimState): SimState => {
	const { trumpCard, agentA, agentB } = state

	if (!trumpCard) throw Error('Trump card not found!');

	const agentACards = CardDatabase.getCardsById(agentA);
	const agentBCards = CardDatabase.getCardsById(agentB);
	const trumpSuit = CardDatabase.getCardById(trumpCard).suit;

	const turn = findWhoseFirstTurn(agentACards, agentBCards, trumpSuit);

	return {
		...state,
		turn: turn,
		status: SIM_GAME_STATUS.ATTACK(turn),
	}
};