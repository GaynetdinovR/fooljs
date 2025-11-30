import { useContext, useEffect } from 'react';
import { useStatus } from '@/stores/gameStore.ts';
import useGameLogic from '@/hooks/useGameLogic.ts';
import TableService from '@/core/TableService.ts';
import { PlayerControlsContext } from '@/ui/PlayerControlsProvider.tsx';
import { useTable } from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import { useDeck } from '@/stores/deckStore.ts';
import useTurnLogic from '@/hooks/useTurnLogic.ts';
import useGameData from '@/utils/hooks/useGameData.ts';
import log from '@/utils/log.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';

// Контроллер, отвечающий за ход игры
const GameController = () => {
	const { status, deck, human, bot, table } = useGameData();

	const { endGameActions, startGameActions } = useGameLogic();
	const { isGameEnd } = useGameConditions()

	const errorCatcher = (fn) => log.withLogger(fn, 'GameController')

	useEffect(() => {
		if (status === 'game-on') {
			errorCatcher(startGameActions);
		}
	}, [status]);

	useEffect(() => {
		if (isGameEnd()) {
			errorCatcher(endGameActions);
		}
	}, [table, bot, human, deck]);

	return null;
};

export default GameController;