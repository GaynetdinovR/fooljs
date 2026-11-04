import type { SimPlayers, SimState } from '../types/SimGameTypes';
import type { AiModeType } from '../../src/types/GameTypes';

import BotAttackService from '../../src/core/BotAttackService';
import GameDataResolver from '../../src/core/GameDataResolver';
import { getOpponent } from '../services/SimPlayerService';
import { toCoreHistory } from '../adapters/toCoreHistory';
import BotDefendService from '../../src/core/BotDefendService';

export const agentAction = (state: SimState, active: SimPlayers, aiMode: AiModeType): any => {
	let gameData;

	gameData = GameDataResolver.resolveBotGameData({
		hand: state[active],
		table: state.table,
		trumpCard: state.trumpCard,
		fall: state.fall,
		deck: state.deck,
		cardsCount: state.settings.cardsCount,
		history: toCoreHistory(state.history),
		opponentHandCount: state[getOpponent(active)].length,
	});

	const isAttacker = active === state.turn;

	if (isAttacker) {
		const attackCard = BotAttackService.attack(aiMode, gameData);

		if (attackCard === undefined) {
			return { player: active, action: 'endMove', cardIds: [] };
		}

		return { player: active, action: 'attack', cardIds: [attackCard.id] };
	}

	const defendCard = BotDefendService.defend(aiMode, gameData);

	if (defendCard === undefined) {
		return { player: active, action: 'endMove', cardIds: [] };
	}

	return {
		player: active,
		action: 'defend',
		cardIds: [defendCard.id],
		attackCardId: defendCard.attackCardId,
	};
};
