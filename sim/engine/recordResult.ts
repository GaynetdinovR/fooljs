import type { RunResult, Stats } from '../types/SimGameTypes';
import { MODE_A, MODE_B, SAME_MODE } from '../entry';

export const recordResult = (stats: Stats, result: RunResult, mirror: boolean): void => {
	const { winner, moves } = result;

	for(const e in result.debug.phases){
		stats.debug.phases[e] += result.debug.phases[e];
	}

	for(const e in result.debug.defenseStrengths){
		stats.debug.defenseStrengths[e] += result.debug.defenseStrengths[e];
	}

	if (winner === 'aborted') {
		stats.aborted++;
		return;
	}

	stats.played++;
	stats.totalMoves += moves;
	stats.minMoves = Math.min(stats.minMoves, moves);
	stats.maxMoves = Math.max(stats.maxMoves, moves);

	if (winner === 'draw') {
		stats.draw++;
		return;
	}

	if (winner === 'none') {
		stats.none++;
		return;
	}

	if (winner === 'agentA') stats.posA++;
	else stats.posB++;

	if (SAME_MODE) return;

	const winnerPolicy = mirror
		? (winner === 'agentA' ? MODE_B : MODE_A)
		: (winner === 'agentA' ? MODE_A : MODE_B);

	if (winnerPolicy === MODE_A) stats.policyA++;
	else stats.policyB++;
};