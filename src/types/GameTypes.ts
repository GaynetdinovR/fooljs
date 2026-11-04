import { TableCardObjectsPair } from '@/types/core/ITableService.ts';
import type { Move } from '@/types/store/MoveHistoryType.ts';

export type CardsCountType = 24 | 36 | 52;
export type GameModeType = 'throw-in' | 'with passing';
export type AiModeType = 'random' | 'fool' | 'easy' | 'medium' | 'hard' | 'extreme';

export type GameDataOptions = 'gameMode' | 'aiMode' | 'cardsCount';
export type MoveWithCardObject = Omit<Move, 'cardIds' | 'attackCardId'> & { cards: Card[], attackCard?: Card | undefined}

export type GameStatus =
	| 'in-menu'
	| 'game-on'
	| 'dealing'
	| 'dealt'
	| 'human-attack'
	| 'bot-attack'
	| 'game-over'
	| 'bot-thinking'
	| 'bot-raising'
	| 'human-raising'
	| 'move-to-fall';

export type GameResults = 'human' | 'bot' | 'draw' | 'none';

export type Players = 'bot' | 'human';

export type GameSettings = {
	aiMode: AiModeType;
	gameMode: GameModeType;
	cardsCount: CardsCountType;
};

export type Suits = 'Heart' | 'Club' | 'Spade' | 'Diamond';
export type CardId = string;
export type Colors = 'black' | 'red';

export type Card = {
	id: string;
	imgPath: string;
	name: string;
	color: Colors;
	power: number;
	suit: Suits;
	isBeaten?: boolean;
};

export type PossibleMoves = {
	[key: CardId]: CardId[];
};

export type BotGameData = {
	hand: Card[],
	table: TableCardObjectsPair[],
	trumpCard: Card,
	fall: Card[],
	deckLength: number,
	cardsCount: CardsCountType,
	history: MoveWithCardObject[],
	opponentHandCount?: number,
}

export type GamePhase = '1' | '2' | '2.5' | '3';