export type CardsCountType = 24 | 36 | 52 | 54;
export type GameModeType = 'throw-in' | 'with passing';
export type AiModeType = 'random' | 'fool' | 'easy' | 'medium' | 'hard' | 'extreme';

export type GameDataOptions = 'gameMode' | 'aiMode' | 'cardsCount';

export type GameStatus =
	'in-menu' | 'game-on' |
	'dealing' | 'dealt' |
	'human-attack' | 'bot-attack' |
	'game-over' | 'bot-thinking' |
	'bot-raising' | 'human-raising' |
	'move-to-fall';

export type GameResults = 'human'| 'bot' | 'draw' | 'none'

export type Players = 'bot' | 'human';

export type GameSettings = {
	aiMode: AiModeType,
	gameMode: GameModeType,
	cardsCount: CardsCountType,
};

export type Suits = 'Heart' | 'Club' | 'Spade' | 'Diamond';

export type Colors = 'black' | 'red'

export type Card = {
	id: string;
	imgPath: string;
	name: string;
	color: Colors;
	power: number;
	suit: Suits;
	isBeaten?: boolean;
}