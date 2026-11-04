import type { AiModeType, CardsCountType } from '../src/types/GameTypes';
import { printStats } from './services/printStats';
import { runSimulation } from './engine/runSimulator';
import * as path from 'path';
import { log } from './services/log';

export const MATCHES = 4000;
export const GAME_SEED = 0;
export const UPPER_LIMIT = 200;
export const CARDS_COUNT: CardsCountType = 52;

export const MODE_A: AiModeType = 'easy';
export const MODE_B: AiModeType = 'easy';
export const SAME_MODE = MODE_A === MODE_B;

export const LOG_STATS: boolean = false;

const MASS_CHECK = true;
const MASS_CARDS_COUNTS: CardsCountType[] = [52];
const MASS_SEEDS: number[] = [123123, 568779, 56173843];

export const WRITE_TO_TXT = false;
export const RESULTS_FILE = path.resolve(process.cwd(), 'sim', 'simResults.txt');

log.start();

log.line('');
log.line('════════════════════════════════════════');
log.line(`Run at: ${new Date().toISOString()}`);
log.line(`Modes:  ${MODE_A} vs ${MODE_B}`);
log.line(`MATCHES per seed: ${MATCHES}`);
log.line('════════════════════════════════════════');

if (MASS_CHECK) {
	for (const cardsCount of MASS_CARDS_COUNTS) {
		for (const gameSeed of MASS_SEEDS) {

			const start = performance.now();

			const totalGames = MATCHES * 2;
			const stats = runSimulation(cardsCount, gameSeed);

			const duration = performance.now() - start;
			printStats(stats, duration, totalGames, cardsCount, gameSeed);
		}
	}
} else {
	const start = performance.now();

	const totalGames = MATCHES * 2;
	const stats = runSimulation(CARDS_COUNT, GAME_SEED);

	const duration = performance.now() - start;
	printStats(stats, duration, totalGames, CARDS_COUNT, GAME_SEED);
}

log.line('');
console.log(`Результаты сохранены в: ${RESULTS_FILE}`);
log.close();