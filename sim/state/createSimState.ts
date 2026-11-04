import type { SimSettings, SimState } from '../types/SimGameTypes';

export const createSimState = (settings: SimSettings): SimState => {
	return {
		agentA: [],
		agentB: [],
		deck: [],
		fall: [],
		table: [],
		status: "init",
		turn: undefined,
		trumpCard: undefined,
		history: [],
		settings: settings
	}
}