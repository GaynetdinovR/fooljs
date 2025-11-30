import type { Players } from '@/types/GameTypes.ts';
import PlayerService from '@/core/PlayerService.ts';
import useGameData from '@/utils/hooks/useGameData.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import useDeckStore, { useTrumpCard } from '@/stores/deckStore.ts';
import { GAME_STATUS } from '@/data/constants.ts';

type TurnLogicType = {
	changeTurn: () => void;
	setFirstTurn: () => void;
	setTurn: (turn: Players) => void;
}


const useTurnLogic = (): TurnLogicType => {
	const { human, bot, turn } = useGameData();
	const { updateTurn, updateStatus } = useStoreActions();

	// Установка хода
	const setTurn = (turn) => {
		updateTurn(turn);

		updateStatus(GAME_STATUS.ATTACK(turn));
	};

	// Установка первого игрока (trumpCard - костыль)
	const setFirstTurn = () => {
		const { trumpCard } = useDeckStore.getState?.();

		if (!trumpCard) throw Error('Trump card not found!');

		const turn = PlayerService.findWhoseFirstTurn(human, bot, trumpCard.suit);

		setTurn(turn);
	};

	// Смена хода
	const changeTurn = () => {
		if(!turn) throw Error('Turn not found!');

		const nextTurn = PlayerService.getAnotherPlayer(turn);

		setTurn(nextTurn);
	};

	return {
		setTurn,
		changeTurn,
		setFirstTurn
	}
};

export default useTurnLogic;