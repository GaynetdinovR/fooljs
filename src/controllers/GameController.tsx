import { useEffect } from 'react';

import log from '@/utils/log.ts';
import useGameData from '@/utils/hooks/useGameData.ts';

import useGameLogic from '@/hooks/useGameLogic.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';

/**
 * Контроллер, отвечающий за ход игры
 */
const GameController = () => {
	const { status, deck, human, bot, table } = useGameData();

	const { endGameActions, startGameActions } = useGameLogic();
	const { isGameEnd } = useGameConditions();

	const errorCatcher = (fn) => log.withLogger(fn, 'GameController');

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
