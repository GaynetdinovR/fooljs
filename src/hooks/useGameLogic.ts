import TableService from '@/core/TableService.ts';
import useGameData from '@/utils/hooks/useGameData.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import useDealingLogic from '@/hooks/useDealingLogic.ts';
import useTurnLogic from '@/hooks/useTurnLogic.ts';
import useDeckInit from '@/hooks/useDeckInit.ts';
import PlayerService from '@/core/PlayerService.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';
import useClearAll from '@/utils/hooks/useClearAll.ts';
import type { GameResults, Players } from '@/types/GameTypes.ts';
import { GAME_STATUS } from '@/data/constants.ts';
import useBotMemory from '@/hooks/useBotMemory.ts';

type GameLogicType = {
	startGameActions: () => void;
	moveToFallActions: () => void;
	raiseActions: (player: Players) => void;
	endGameActions: () => void;
	endMoveActions: (attackingPlayer: Players) => void;
	getGameResults: () => GameResults;
}

const useGameLogic = (): GameLogicType => {
	const { table, status, human, bot, settings } = useGameData();

	const {
		updateStatus,
		moveToFall,
		clearTable,
		giveCardsToPlayer,
		updateStats
	} = useStoreActions();
	const { changeTurn, setFirstTurn } = useTurnLogic();
	const { dealCards, firstDealing } = useDealingLogic();
	const { initDeck } = useDeckInit();
	const { clearAll } = useClearAll();
	const { isGameEnd } = useGameConditions();

	// Действия при начале игры
	const startGameActions = () => {
		if (status === 'dealing') return;

		initDeck();

		updateStatus('dealing');

		firstDealing();

		updateStatus('dealt');

		setFirstTurn();
	};

	// Действия при окончании хода *setTimeout - костыль для уменьшения синхронности, чтобы контроллер успел словить статус*
	const moveToFallActions = async () => {
		updateStatus('move-to-fall')

		setTimeout(() => {
			moveToFall(table.flat());

			clearTable();

			changeTurn();

			dealCards();
		}, 0)
	};

	// Действия при поднятии карт игроком
	const raiseActions = (player: Players) => {
		updateStatus(GAME_STATUS.RAISE(player));
	};

	// Действия, при конце подкидки карт(тому, кто поднимает)
	const endMoveActions = (attackingPlayer: Players) => {
		giveCardsToPlayer(PlayerService.getAnotherPlayer(attackingPlayer), TableService.getAllCards(table));

		clearTable();

		//ERROR: карты раздаются прежде чем карты берутся со стола

		dealCards();

		updateStatus(GAME_STATUS.ATTACK(attackingPlayer));
	};

	// Действия при конце игры
	const endGameActions = () => {
		updateStats({ settings, result: getGameResults()} )

		updateStatus('game-over');

		clearAll();
	};

	// Возвращает победителя
	const getGameResults = () => {
		if(!isGameEnd()) return 'none';
		if(human.length === 0 && bot.length === 0) return 'draw';
		if(human.length === 0 && bot.length !== 0) return 'human';
		if(human.length !== 0 && bot.length === 0) return 'bot';

		return 'none'
	}

	return {
		startGameActions,
		moveToFallActions,
		endGameActions,
		getGameResults,
		endMoveActions,
		raiseActions
	};
};

export default useGameLogic;