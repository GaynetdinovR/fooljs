import useGameData from '@/utils/hooks/useGameData.ts';

import type { TableCardPair } from '@/types/store/TableStoreType.ts';

import TableService from '@/core/TableService.ts';
import GameConditions from '@/core/GameConditions.ts';
import GameDataResolver from '@/core/GameDataResolver.ts';

type GameConditionsType = {
	isTableBeaten: (currentTable: TableCardPair[]) => boolean;
	isTableEmpty: (currentTable: TableCardPair[]) => boolean;
	isGameEnd: () => boolean;
};

const useGameConditions = (): GameConditionsType => {
	const { table, deck, bot, human, status } = useGameData();

	const isTableBeaten = (currentTable) => TableService.isTableBeaten(GameDataResolver.resolveTablePairs(currentTable));

	const isTableEmpty = (currentTable) =>
		GameConditions.isTableEmpty(currentTable);

	const isGameEnd = () =>
		GameConditions.isGameEnd({
			table,
			deckLength: deck.length,
			handA: human,
			handB: bot,
		}) &&
		status !== 'in-menu' &&
		status !== 'game-over';

	return {
		isTableBeaten,
		isTableEmpty,
		isGameEnd,
	};
};

export default useGameConditions;
