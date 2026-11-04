import { SimPlayers } from './types/SimGameTypes';

export const SIM_GAME_STATUS = {
	ATTACK: (player: SimPlayers): 'agentA-attack' | 'agentB-attack' => `${player}-attack`,
	RAISE: (player: SimPlayers): 'agentA-raising' | 'agentB-raising' => `${player}-raising`,
} as const;