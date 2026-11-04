import type { Stats } from '../types/SimGameTypes';

export const createStats = (): Stats => ({
	posA: 0,
	posB: 0,
	policyA: 0,
	policyB: 0,
	draw: 0,
	none: 0,
	aborted: 0,
	totalMoves: 0,
	minMoves: Infinity,
	maxMoves: 0,
	played: 0,
	debug: {
		phases: {
			'1': 0,
			'2': 0,
			'2.5': 0,
			'3': 0,
		},
		defenseStrengths: { 'strong': 0, 'medium': 0, 'weak': 0 },
	},
});