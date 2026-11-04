import type { AiModeType } from '../../src/types/GameTypes';
import type { SimAction, SimPlayers, SimState } from '../types/SimGameTypes';
import { agentAction } from './agentAction';

type Agent = {
	aiMode: AiModeType;
	decide: (state: SimState, actor: SimPlayers) => SimAction;
};

const EasyAgent: Agent = {
	aiMode: 'easy',
	decide: (state, actor) => agentAction(state, actor, 'easy'),
};

const MediumAgent: Agent = {
	aiMode: 'medium',
	decide: (state, actor) => agentAction(state, actor, 'medium'),
};