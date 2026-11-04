import GameResultsService from '../../src/core/GameResultsService';
import type { SimState } from '../types/SimGameTypes';

export const toSimResults = (state: SimState) => {
	const result = GameResultsService.getResults({
		handA: state.agentA, handB: state.agentB
	});

	if(result === 'human') return 'agentA';
	if(result === 'bot') return 'agentB';

	return result;
};