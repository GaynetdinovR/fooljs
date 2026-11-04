import { useEffect } from 'react';

import useGameStore from '@/stores/gameStore.ts';
import { useTable } from '@/stores/tableStore.ts';

import useGameConditions from '@/hooks/useGameConditions.ts';

import { usePlayerControls } from '@/ui/PlayerControlsContext.tsx';

import type { TableCardPair } from '@/types/store/TableStoreType.ts';

/**
 * Контроллер, отвечает за доступность кнопок игрока
 **/
const PlayerController = () => {
	const { status } = useGameStore();
	const table: TableCardPair[] = useTable();
	const { isTableEmpty, isTableBeaten } = useGameConditions();

	const { setMoveToFallDisabled, setRaiseDisabled, setEndMoveDisabled } =
		usePlayerControls();

	useEffect(() => {
		if (status === 'bot-raising') {
			setEndMoveDisabled(false);
			setMoveToFallDisabled(true);
		}
		if (status === 'human-attack' && isTableBeaten(table) && !isTableEmpty(table))
			setMoveToFallDisabled(false);
		if (status === 'bot-attack' && !isTableEmpty(table) && !isTableBeaten(table))
			setRaiseDisabled(false);
		if (status === 'bot-attack' && isTableBeaten(table)) setRaiseDisabled(true);
	}, [status, table]);

	return null;
};

export default PlayerController;
