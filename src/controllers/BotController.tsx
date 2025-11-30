import { useStatus } from '@/stores/gameStore.ts';
import { useEffect, useState } from 'react';
import useBotActions from '@/hooks/useBotActions.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';
import { useTable } from '@/stores/tableStore.ts';

// Контроллер, отвечающий за действия бота
const BotController = () => {
	const status = useStatus();
	const table = useTable();
	const { isTableEmpty, isTableBeaten } = useGameConditions();

	const { defend, attack } = useBotActions();

	const [isMoveEnd, setMoveEnd] = useState(true);

	const wait = async (fn) => {
		setMoveEnd(false);

		await fn();

		setMoveEnd(true);
	}

	useEffect(() => {
		if(!isMoveEnd) return;

		if (status === 'human-attack' && !isTableEmpty(table) && !isTableBeaten(table)) wait(defend)
		if (status === 'bot-attack' || status === 'human-raising') wait(attack);
	}, [status, table, isMoveEnd]);

	return null;
};

export default BotController;