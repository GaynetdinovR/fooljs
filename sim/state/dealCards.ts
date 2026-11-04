import DealingService from '../../src/core/DealingService.ts';
import type { SimPlayers, SimState } from '../types/SimGameTypes.ts';
import type { CardId } from '../../src/types/GameTypes.ts';

/**
 * Раскладывает карты из колоды в руки по countA / countB
 * Порядок: agentA берёт первым, agentB — вторым
 */
const applyDeal = (state: SimState, countA: number, countB: number, whoFirst: SimPlayers): SimState => {
	let cardsForA: CardId[];
	let cardsForB: CardId[];

	if (whoFirst === 'agentA') {
		cardsForA = state.deck.slice(0, countA);
		cardsForB = state.deck.slice(countA, countA + countB);
	}

	if (whoFirst === 'agentB') {
		cardsForB = state.deck.slice(0, countB);
		cardsForA = state.deck.slice(countB, countA + countB);
	}

	return {
		...state,
		agentA: [...state.agentA, ...cardsForA],
		agentB: [...state.agentB, ...cardsForB],
		deck: state.deck.slice(countA + countB),
	};
};

/**
 * Раздача карт обоим игрокам до 6 карт (или поровну, если колоды мало)
 */
export const dealCards = (state: SimState, whoFirst: SimPlayers): SimState => {
	const { agentA, agentB, deck } = state;

	if (DealingService.shouldDealEvenly(agentA, agentB, deck.length)) {
		const [toA, toB] = DealingService.getEvenDealCounts(agentA, agentB, deck.length);
		return applyDeal(state, toA, toB, whoFirst);
	}

	const [toA, toB] = DealingService.getDealCounts(agentA, agentB, deck.length);

	if (toA === 0 && toB === 0) return state;

	return applyDeal(state, toA, toB, whoFirst);
};