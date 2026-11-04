import type { Stats } from '../types/SimGameTypes';
import type { CardsCountType } from '../../src/types/GameTypes';
import { LOG_STATS, MODE_A, MODE_B, SAME_MODE } from '../entry';
import { log } from './log';

const seOfShare = (p: number, n: number) => (n > 0 ? Math.sqrt((p * (1 - p)) / n) : 0);
const fmtCi = (p: number, se: number) => `±${(1.96 * se * 100).toFixed(2)}%`;

export const printStats = (
	stats: Stats,
	duration: number,
	totalGames: number,
	cardsCount: CardsCountType,
	gameSeed: number,
) => {
	const safeDiv = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0);
	const avgMoves = stats.played > 0
		? Math.round(stats.totalMoves / stats.played)
		: 0;

	log.line('────────────────────────────────────────');
	log.line(`Deck:       ${cardsCount}   Seed: ${gameSeed}`);
	log.line(`Total:      ${duration.toFixed(2)} ms`);
	log.line(`Per game:   ${(duration / totalGames).toFixed(3)} ms`);
	log.line(`Modes:      ${MODE_A} vs ${MODE_B}`);
	log.line('────────────────────────────────────────');

	if (SAME_MODE) {
		log.line(`Pos A:      ${stats.posA} (${safeDiv(stats.posA, stats.played).toFixed(2)}%)`);
		log.line(`Pos B:      ${stats.posB} (${safeDiv(stats.posB, stats.played).toFixed(2)}%)`);
	} else {
		const n = stats.played;
		const pA = n > 0 ? stats.policyA / n : 0;
		const pB = n > 0 ? stats.policyB / n : 0;
		const seA = seOfShare(pA, n);
		const seB = seOfShare(pB, n);
		const seDelta = Math.sqrt(seA * seA + seB * seB);
		const delta = pB - pA;

		log.line(`Mode A:     ${MODE_A.padEnd(8)} → ${stats.policyA} (${safeDiv(stats.policyA, stats.played).toFixed(2)}% ${fmtCi(pA, seA)})`);
		log.line(`Mode B:     ${MODE_B.padEnd(8)} → ${stats.policyB} (${safeDiv(stats.policyB, stats.played).toFixed(2)}% ${fmtCi(pA, seA)})`);

		log.line(`Δ (B−A):    ${delta >= 0 ? '+' : ''}${(delta * 100).toFixed(2)}%  ±${(1.96 * seDelta * 100).toFixed(2)}%`);
	}

	log.line(`Draw:       ${stats.draw} (${safeDiv(stats.draw, stats.played).toFixed(2)}%)`);
	log.line(`Aborted:    ${stats.aborted} (${safeDiv(stats.aborted, totalGames).toFixed(2)}%)`);
	log.line(`Moves:      avg ${avgMoves}, min ${stats.minMoves}, max ${stats.maxMoves}`);
	log.line('────────────────────────────────────────');

	if (LOG_STATS) {
		const totalPhases = Object.values(stats.debug.phases).reduce((s, v) => s + v, 0);
		const totalDefenses = Object.values(stats.debug.defenseStrengths).reduce((s, v) => s + v, 0);

		const pct = (v: number, total: number) =>
			total > 0 ? ((v / total) * 100).toFixed(1) : '0.0';

		const row = (label: string, v: number, total: number) =>
			`  ${label.padEnd(6)} ${pct(v, total).padStart(5)}%  ${v.toString().padStart(7)}`;

		log.line('Фазы:');
		log.line(row('1', stats.debug.phases['1'], totalPhases));
		log.line(row('2', stats.debug.phases['2'], totalPhases));
		log.line(row('3', stats.debug.phases['3'], totalPhases));
		log.line('────────────────────────────────────────');
		log.line('Защитный потенциал руки:');
		log.line(row('strong', stats.debug.defenseStrengths.strong, totalDefenses));
		log.line(row('medium', stats.debug.defenseStrengths.medium, totalDefenses));
		log.line(row('weak', stats.debug.defenseStrengths.weak, totalDefenses));
		log.line('────────────────────────────────────────');
	}
};