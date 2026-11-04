import type { SimAction, SimMove, SimPlayers, SimState } from '../types/SimGameTypes';
import type { CardId } from '../../src/types/GameTypes';
import { isTableBeatenByIds } from '../logic/isTableBeatenByIds';
import { getOpponent } from '../services/SimPlayerService';
import { SIM_GAME_STATUS } from '../simConstants';
import { dealCards } from '../state/dealCards';
import TableService from '../../src/core/TableService';

export const applyMove = (state: SimState, action: SimAction): SimState => {
	switch (action.action) {
		case 'attack':
			return applyAttack(state, action);
		case 'defend':
			return applyDefend(state, action);
		case 'endMove':
			return applyEndMove(state, action);
	}
}

/**
 * Атака: убрать карту из руки, положить на стол, записать в историю
 */
const applyAttack = (state: SimState, action: SimAction): SimState => {
	if (!action.cardIds.length) throw Error('Attack without card');
	if (!state[action.player].includes(action.cardIds[0])) {
		throw Error(`Card ${action.cardIds[0]} not in hand of ${action.player}`);
	}

	const cardId = action.cardIds[0];

	const historyMove: SimMove = {
		moveNumber: state.history.length + 1,
		player: action.player,
		action: 'attack',
		cardIds: [cardId],
	};

	return {
		...state,
		[action.player]: state[action.player].filter((id) => id !== cardId),
		table: [...state.table, [cardId, null]],
		history: [...state.history, historyMove],
	};
};

/**
 * Защита: убрать карту из руки, побить карту на столе, записать в историю
 */
const applyDefend = (state: SimState, action: SimAction): SimState => {
	if (!action.cardIds.length) throw Error('Defend without card');
	if (!action.attackCardId) throw Error('Defend without attackCardId');
	if (!state[action.player].includes(action.cardIds[0])) {
		throw Error(`Card ${action.cardIds[0]} not in hand of ${action.player}`);
	}

	const defendCardId = action.cardIds[0];
	const attackCardId = action.attackCardId;

	const newTable = state.table.map(([attackId, defendId]) => {
		if (attackId !== attackCardId) return [attackId, defendId] as [CardId, CardId | null];
		return [attackId, defendCardId] as [CardId, CardId | null];
	});

	const move: SimMove = {
		moveNumber: state.history.length + 1,
		player: action.player,
		action: 'defend',
		cardIds: [defendCardId],
		attackCardId: attackCardId,
	};

	return {
		...state,
		[action.player]: state[action.player].filter((id) => id !== defendCardId),
		table: newTable,
		history: [...state.history, move],
	};
};

/**
 * Конец хода:
 * - атакующий → бито (если стол побит)
 * - защитник → взятие (защитник забирает карты стола)
 * В обоих случаях: смена хода, раздача, обновление статуса
 */
const applyEndMove = (state: SimState, action: SimAction): SimState => {
	const isAttacker = action.player === state.turn;

	if (isAttacker) {
		if (!isTableBeatenByIds(state.table)) {
			throw Error('Cannot end move with unbeaten table');
		}

		return moveToFall(state);
	}

	return applyRaise(state, action.player);
};

/**
 * Бито: карты стола уходят в fall, смена хода, раздача
 */
const moveToFall = (state: SimState): SimState => {
	const cardsToFall = TableService.getAllCards(state.table);

	const newTurn = getOpponent(state.turn);
	const oldTurn = state.turn;

	const next: SimState = {
		...state,
		fall: [...state.fall, ...cardsToFall],
		table: [],
		turn: newTurn,
		status: SIM_GAME_STATUS.ATTACK(newTurn),
	};

	return dealCards(next, oldTurn);
};

/**
 * Взятие: защитник забирает карты стола, запись raise в историю, смена хода, раздача
 */
const applyRaise = (state: SimState, defender: SimPlayers): SimState => {
	const cardsToTake = TableService.getAllCards(state.table)

	const move: SimMove = {
		moveNumber: state.history.length + 1,
		player: defender,
		action: 'raise',
		cardIds: cardsToTake,
	};

	const next: SimState = {
		...state,
		[defender]: [...state[defender], ...cardsToTake],
		table: [],
		history: [...state.history, move],
	};

	return dealCards(next, state.turn);
};