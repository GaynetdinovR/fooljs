import TableService from '@/core/TableService.ts';

import useGameData from '@/utils/hooks/useGameData.ts';

import type { TableCardPair } from '@/types/store/TableStoreType.ts';

type GameConditionsType = {
	/**
	 * Условие "побитого" стола
	 */
	isTableBeaten: (currentTable: TableCardPair[]) => boolean;
	/**
	 * Условие пустого стола
	 */
	isTableEmpty: (currentTable: TableCardPair[]) => boolean;
	/**
	 * Условия конца игры
	 */
	isGameEnd: () => boolean;
};

const useGameConditions = (): GameConditionsType => {
	const { table, deck, bot, human, status } = useGameData();

	const isTableBeaten = (currentTable) => TableService.isTableBeaten(currentTable);
	const isTableEmpty = (currentTable) => currentTable.length === 0;

	const isGameEnd = () => {
		const conditions = {
			isTableEmpty: table.flat().length === 0,
			isAnyPlayerHandEmpty: bot.length === 0 || human.length === 0,
			isDeckEmpty: deck.length === 0,
		};

		return (
			Object.values(conditions).every((condition) => condition) &&
			status !== 'in-menu' &&
			status !== 'game-over'
		);
	};

	return {
		isTableBeaten,
		isTableEmpty,
		isGameEnd,
	};
};

export default useGameConditions;
