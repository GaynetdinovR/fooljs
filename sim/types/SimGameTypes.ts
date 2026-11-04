import type { AiModeType, CardId, CardsCountType } from '../../src/types/GameTypes';
import type { TableCardPair } from '../../src/types/store/TableStoreType';

export type SimGameStatus =
	| 'init'
	| 'agentA-attack'
	| 'agentB-attack'
	| 'game-over'
	| 'agentA-raising'
	| 'agentB-raising';

export type SimPlayers = 'agentA' | 'agentB';

export type SimMove = {
	moveNumber: number,
	player: SimPlayers,
	cardIds: CardId[],
	action: 'defend' | 'attack' | 'raise'
	attackCardId?: CardId
}

export type SimAction = {
	player: SimPlayers,
	cardIds: CardId[],
	action: 'defend' | 'attack' | 'raise' | 'endMove'
	attackCardId?: CardId
}

export type SimSettings = {
	aiModeA: AiModeType;
	aiModeB: AiModeType;
	cardsCount: CardsCountType;
	gameSeed: number;
};

export type SimState = {
	agentA: CardId[],
	agentB: CardId[],
	deck: CardId[],
	fall: CardId[],
	table: TableCardPair[],
	status: SimGameStatus,
	trumpCard: CardId | undefined,
	history: SimMove[],
	settings: SimSettings
	turn: undefined | SimPlayers,
}
export type Winner = SimPlayers | 'draw' | 'none' | 'aborted';

export type RunResult = {
	winner: Winner;
	moves: number;
	debug?: Record<any, any>;
};

export type Stats = {
	posA: number;
	posB: number;
	policyA: number;
	policyB: number;
	draw: number;
	none: number;
	aborted: number;
	totalMoves: number;
	minMoves: number;
	maxMoves: number;
	played: number;
	debug?: Record<any, any>;
};