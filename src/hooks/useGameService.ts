import GameService from '@/core/GameService.ts';

import useGameData from '@/utils/hooks/useGameData.ts';

import { GamePhase } from '@/types/GameTypes.ts';

const useGameService = (): {getGamePhase: () => GamePhase} => {
	const { deck, fall, bot, human, settings } = useGameData();
	const getGamePhase = () => {
		const cardsCount = {
			deck: deck.length,
			fall: fall.length,
			bot: bot.length,
			human: human.length,
		};

		return GameService.getGamePhase(cardsCount, settings.cardsCount);
	};

	return {
		getGamePhase,
	};
};

export default useGameService;
