import usePlayersStore from '@/stores/playersStore.ts';
import { useTrumpCard } from '@/stores/deckStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import logger from '@/utils/logger.ts';
import PlayerService from '@/core/PlayerService.ts';

const useGameController = () => {
	const { bot, human } = usePlayersStore();
	const trumpCard = useTrumpCard();
	const { updateTurn, updateStatus } = useGameStore();

	const setFirstTurn = () => {
		if (!trumpCard) return logger.error('Козырная карта не найдена');

		const turn = PlayerService.getWhoseTurn(human, bot, trumpCard.suit);

		updateTurn(turn);
		updateStatus(`${turn}-attack`);
	};

	return {
		setFirstTurn
	}
};

export default useGameController;