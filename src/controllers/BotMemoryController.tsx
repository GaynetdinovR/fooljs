import { useEffect } from 'react';

import { useTable } from '@/stores/tableStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import useBotMemory from '@/hooks/useBotMemory.ts';

import TableService from '@/core/TableService.ts';

import type { TableCardPair } from '@/types/store/TableStoreType.ts';
import { GameStatus } from '@/types/GameTypes.ts';

/**
 * Контроллер памяти бота
 */
const BotMemoryController = () => {
	const table: TableCardPair[] = useTable();
	const status: GameStatus = useStatus();
	const { addRaisedCards, removeUsedRaisedCards, addBeatenCards } = useBotMemory();

	const tableCards = TableService.getAllCards(table);

	const onMoveToFall = () => {
		removeUsedRaisedCards(tableCards);

		addBeatenCards(table);
	};

	useEffect(() => {
		if (status === 'human-raising') addRaisedCards(tableCards);
		if (status === 'move-to-fall') onMoveToFall();
	}, [status, table]);

	return null;
};

export default BotMemoryController;
