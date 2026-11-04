import { createSimState } from '../state/createSimState';
import { initDeck } from '../state/initDeck';
import { dealCards } from '../state/dealCards';
import { setFirstTurn } from '../state/setFirstTurn';
import { Random } from '../../src/utils/Random';
import { mulberry32 } from '../rng/mulberry32';
import type { SimSettings, SimState } from '../types/SimGameTypes';
import GameDataResolver from '../../src/core/GameDataResolver';
import { resetCoreHistoryCache } from '../adapters/toCoreHistory';

export const initGame = (settings: SimSettings): SimState => {
	Random.set(mulberry32(settings.gameSeed));

	GameDataResolver.resetCache();
	resetCoreHistoryCache()

	let state = createSimState(settings);
	state = initDeck(state);
	state = dealCards(state, 'agentA');
	state = setFirstTurn(state);

	return state;
}