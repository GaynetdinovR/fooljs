import type { CardId, GameResults } from '@/types/GameTypes.ts';

type GameResultsParams = {
	handA: CardId[];
	handB: CardId[];
};

type IGameResultsService = {
	/**
	 * Возвращает результат партии по рукам обоих игроков
	 */
	getResults: (params: GameResultsParams) => GameResults;
};

const GameResultsService: IGameResultsService = {
	getResults: ({ handA, handB }) => {
		if (handA.length === 0 && handB.length === 0) return 'draw';
		if (handA.length === 0 && handB.length !== 0) return 'human';
		if (handA.length !== 0 && handB.length === 0) return 'bot';

		return 'none';
	},
};

export default GameResultsService;