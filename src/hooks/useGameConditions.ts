import useGameData from '@/utils/hooks/useGameData.ts';
import { useMemo } from 'react';
import TableService from '@/core/TableService.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

type GameConditionsType = {
	isTableBeaten: (currentTable: TableCardPair[]) => boolean;
	isTableEmpty: (currentTable: TableCardPair[]) => boolean;
	isGameEnd: () => boolean;
}

const useGameConditions = (): GameConditionsType => {
	const { table, deck, bot, human, status } = useGameData();

	// Условие "побитого" стола
	const isTableBeaten = (currentTable) => TableService.isTableBeaten(currentTable);
	// Условие пустого стола
	const isTableEmpty = (currentTable) => currentTable.length === 0;

	// Условия конца игры
	const isGameEnd = () => {
		const conditions = {
			isTableEmpty: table.flat().length === 0,
			isAnyPlayerHandEmpty: bot.length === 0 || human.length === 0,
			isDeckEmpty: deck.length === 0,
		};

		return Object.values(conditions).every(condition => condition) && status !== 'in-menu' && status !== 'game-over';
	};

	return {
		isTableBeaten,
		isTableEmpty,
		isGameEnd,
	};
};

export default useGameConditions;