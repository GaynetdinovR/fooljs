import type { SimPlayers } from '../types/SimGameTypes';
import type { Card, Suits } from '../../src/types/GameTypes';
import CardService from '../../src/core/CardService';
import { Random } from '../../src/utils/Random';

export const getOpponent = (p: SimPlayers): SimPlayers =>
	p === 'agentA' ? 'agentB' : 'agentA';

export const findWhoseFirstTurn = (
	handA: Card[],
	handB: Card[],
	trumpSuit: Suits,
): SimPlayers => {
	const aLowest = CardService.findLowestSuit(handA, trumpSuit);
	const bLowest = CardService.findLowestSuit(handB, trumpSuit);

	if (aLowest && bLowest) return aLowest.power < bLowest.power ? 'agentA' : 'agentB';
	if (aLowest) return 'agentA';
	if (bLowest) return 'agentB';

	return Random.getArrayElem(['agentA', 'agentB']);
};