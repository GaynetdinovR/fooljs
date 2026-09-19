import { RULES } from '@/data/rules.ts';
import { GAME_STATUS } from '@/data/constants.ts';

import useGameData from '@/utils/hooks/useGameData.ts';
import useClearAll from '@/utils/hooks/useClearAll.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import { withGameEndGuard } from '@/utils/hooks/withGameEndGuard.ts';

import TableService from '@/core/TableService.ts';
import PlayerService from '@/core/PlayerService.ts';

import useDealingLogic from '@/hooks/useDealingLogic.ts';
import useTurnLogic from '@/hooks/useTurnLogic.ts';
import useDeckInit from '@/hooks/useDeckInit.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';

import type { Players } from '@/types/GameTypes.ts';
import type { GameLogic } from '@/types/hooks/GameLogic.ts';

const useGameLogic = (): GameLogic => {
	const { table, status, human, bot, settings } = useGameData();

	const { updateStatus, moveToFall, clearTable, giveCardsToPlayer, updateStats } =
		useStoreActions();
	const { changeTurn, setFirstTurn } = useTurnLogic();
	const { dealCards, dealCardsToBothPlayers } = useDealingLogic();
	const { initDeck } = useDeckInit();
	const { clearAll } = useClearAll();
	const { isGameEnd } = useGameConditions();

	const startGameActions = () => {
		if (status === 'dealing') return;

		initDeck();

		updateStatus('dealing');

		dealCardsToBothPlayers(RULES.fool.cardsPerPlayer, RULES.fool.cardsPerPlayer);

		updateStatus('dealt');

		setFirstTurn();
	};

	const moveToFallActions = async () => {
		withGameEndGuard(() => {
			updateStatus('move-to-fall');

			setTimeout(() => {
				moveToFall(table.flat());

				clearTable();

				changeTurn();

				dealCards();
			}, 0);
		}, endGameActions, isGameEnd)
	};

	const raiseActions = (player: Players) => {
		updateStatus(GAME_STATUS.RAISE(player));
	};

	const endMoveActions = (attackingPlayer: Players) => {
		giveCardsToPlayer(
			PlayerService.getAnotherPlayer(attackingPlayer),
			TableService.getAllCards(table),
		);

		clearTable();

		dealCards();

		updateStatus(GAME_STATUS.ATTACK(attackingPlayer));
	};

	const endGameActions = () => {
		updateStats({ settings, result: getGameResults() });

		updateStatus('game-over');

		clearAll();
	};

	const getGameResults = () => {
		if (!isGameEnd()) return 'none';
		if (human.length === 0 && bot.length === 0) return 'draw';
		if (human.length === 0 && bot.length !== 0) return 'human';
		if (human.length !== 0 && bot.length === 0) return 'bot';

		return 'none';
	};

	return {
		startGameActions,
		moveToFallActions,
		endGameActions,
		getGameResults,
		endMoveActions,
		raiseActions,
	};
};

export default useGameLogic;
