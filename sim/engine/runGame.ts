import type { AiModeType, CardsCountType } from '../../src/types/GameTypes';
import type { RunResult, SimState, Winner } from '../types/SimGameTypes';
import { initGame } from './initGame';
import { isGameEnd } from '../logic/isGameEnd';
import { getActiveAgent } from './getActiveAgent';
import { agentAction } from './agentAction';
import { applyMove } from './applyMove';
import type { toSimResults } from '../adapters/toSimResults';
import { LOG_STATS, UPPER_LIMIT } from '../entry';
import GameService from '../../src/core/GameService';
import BotStrategyService from '../../src/core/BotStrategyService';
import CardDatabase from '../../src/core/CardDatabase';

type RunGameParams = {
	seed: number;
	modeA: AiModeType;
	modeB: AiModeType;
	cardsCount: CardsCountType;
};

export const runGame = ({ seed, modeA, modeB, cardsCount }: RunGameParams): RunResult => {
	const settings = {
		aiModeA: modeA,
		aiModeB: modeB,
		cardsCount,
		gameSeed: seed,
	};
	let state: SimState = initGame(settings);
	let moves = 0;

	const phases = {
		'1': 0,
		'2': 0,
		'3': 0
	};
	const defenseStrengths = { 'strong': 0, 'medium': 0, 'weak': 0 };

	while (!isGameEnd(state)) {
		if (moves > UPPER_LIMIT) {
			return { winner: 'aborted', moves };
		}
		if (LOG_STATS) {
			const phase = GameService.getGamePhase(
				{ deck: state.deck.length, fall: state.fall.length },
				state.settings.cardsCount
			);

			const defenseStrength = BotStrategyService.evaluateDefenseStrength(
				CardDatabase.getCardsById(state.agentA),
				CardDatabase.getCardById(state.trumpCard).suit,
				state.settings.cardsCount
			)
			defenseStrengths[defenseStrength]++;
			phases[phase]++;
		}

		const active = getActiveAgent(state);
		if (!active) throw Error(`No active agent at status ${state.status}`);
		const mode = active === 'agentA' ? modeA : modeB;

		const action = agentAction(state, active, mode);

		state = applyMove(state, action);
		moves++;
	}

	return {
		winner: toSimResults(state) as Winner,
		moves,
		debug: {
			phases: phases,
			defenseStrengths: defenseStrengths,
		},
	};
};