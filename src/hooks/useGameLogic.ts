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

import type { CardId, Players } from '@/types/GameTypes.ts';
import type { GameLogic } from '@/types/hooks/GameLogic.ts';

import useGameStore from '@/stores/gameStore.ts';
import GameDataResolver from '@/core/GameDataResolver.ts';
import GameResultsService from '@/core/GameResultsService.ts';

const useGameLogic = (): GameLogic => {
	const gameData = useGameData();
	const {
		table,
		status,
		settings,
		human,
		bot,
	} = gameData;

	const {
		updateStatus,
		moveToFall,
		clearTable,
		giveCardsToPlayer,
		updateStats,
		addMoveToHistory,
		incrementMoveNumber,
	} =
		useStoreActions();
	const { changeTurn, setFirstTurn } = useTurnLogic();
	const { dealCards, dealCardsToBothPlayers } = useDealingLogic();
	const { initDeck } = useDeckInit();
	const { clearAll } = useClearAll();
	const { isGameEnd } = useGameConditions();

	const startGameActions = () => {
		if (status === 'dealing') return;

		GameDataResolver.resetCache();

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
				const cardsToFall = table.flat().filter((id): id is CardId => id !== null);

				moveToFall(cardsToFall);

				clearTable();

				incrementMoveNumber(1);

				changeTurn();

				dealCards();
			}, 0);
		}, endGameActions, isGameEnd);
	};

	const raiseActions = (player: Players) => {
		updateStatus(GAME_STATUS.RAISE(player));
	};

	const endMoveActions = (attackingPlayer: Players) => {
		const takingPlayer = PlayerService.getAnotherPlayer(attackingPlayer);
		const cards = TableService.getAllCards(table);

		giveCardsToPlayer(takingPlayer, cards);

		addMoveToHistory({
			moveNumber: useGameStore.getState().moveNumber ?? 0,
			player: takingPlayer,
			action: 'raise',
			cardIds: cards,
		});

		incrementMoveNumber(1);

		clearTable();

		dealCards();

		updateStatus(GAME_STATUS.ATTACK(attackingPlayer));
	};

	const endGameActions = () => {
		updateStats({ settings, result: GameResultsService.getResults({ handA: human, handB: bot }) });

		updateStatus('game-over');

		clearAll();
	};

	return {
		startGameActions,
		moveToFallActions,
		endGameActions,
		endMoveActions,
		raiseActions,
	};
};

export default useGameLogic;
