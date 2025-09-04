import { useEffect } from 'react';
import { useStatus } from '@/stores/gameStore.ts';
import useGameController from '@/hooks/useGameController.ts';

// Логический компонент, отвечающий за изменение статуса игры(ничего не рендерит)
const GameController = () => {
	const status = useStatus();
	const { setFirstTurn } = useGameController();

	useEffect(() => {
		if (status === 'dealt') setFirstTurn();
	}, [status]);

	return null;
};

export default GameController;