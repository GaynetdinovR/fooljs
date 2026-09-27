import type { Players } from '@/types/GameTypes.ts';
import PlayerService from '@/core/PlayerService.ts';
import useGameData from '@/utils/hooks/useGameData.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import useDeckStore from '@/stores/deckStore.ts';
import { GAME_STATUS } from '@/data/constants.ts';
import CardDatabase from '@/core/CardDatabase.ts';

type TurnLogicType = {
	/**
	 * Установка хода
	 */
	changeTurn: () => void;
	/**
	 * Установка первого игрока
	 * TODO: trumpCard - костыль
	 */
	setFirstTurn: () => Players;
	/**
	 * Смена хода
	 */
	setTurn: (turn: Players) => void;
};

const useTurnLogic = (): TurnLogicType => {
	const { human, bot, turn } = useGameData();
	const { updateTurn, updateStatus } = useStoreActions();

	const setTurn = (turn) => {
		updateTurn(turn);

		updateStatus(GAME_STATUS.ATTACK(turn));
	};

	const setFirstTurn = () => {
		const { trumpCard } = useDeckStore.getState();

		if (!trumpCard) throw Error('Trump card not found!');

		const humanCards = CardDatabase.getCardsById(human);
		const botCards = CardDatabase.getCardsById(bot);
		const trumpSuit = CardDatabase.getCardById(trumpCard).suit;

		const turn = PlayerService.findWhoseFirstTurn(humanCards, botCards, trumpSuit);

		setTurn(turn);
		return turn;
	};

	const changeTurn = () => {
		if (!turn) throw Error('Turn not found!');

		const nextTurn = PlayerService.getAnotherPlayer(turn);

		setTurn(nextTurn);
	};

	return {
		setTurn,
		changeTurn,
		setFirstTurn,
	};
};

export default useTurnLogic;
