import type { CardsCountType } from '../../src/types/GameTypes';
import { MATCHES, MODE_A, MODE_B } from '../entry';
import { runGame } from './runGame';
import { recordResult } from './recordResult';
import type { Stats } from '../types/SimGameTypes';
import { createStats } from './createStats';

export const runSimulation = (
	cardsCount: CardsCountType,
	gameSeed: number,
): Stats => {
	const stats = createStats();

	for (let i = 0; i < MATCHES; i++) {
		const seed = gameSeed + i;

		const straight = runGame({
			seed,
			modeA: MODE_A,
			modeB: MODE_B,
			cardsCount,
		});
		recordResult(stats, straight, false);

		const mirrored = runGame({
			seed,
			modeA: MODE_B,
			modeB: MODE_A,
			cardsCount,
		});
		recordResult(stats, mirrored, true);
	}

	return stats;
};