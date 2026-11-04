import type { CardId } from '@/types/GameTypes.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';

type GameEndParams = {
	table: TableCardPair[];
	deckLength: number;
	handA: CardId[];
	handB: CardId[];
};

type IGameConditions = {
	/**
	 * Условие конца игры: стол пуст, колода пуста, у кого-то пустая рука
	 */
	isGameEnd: (params: GameEndParams) => boolean;

	/**
	 * Условие пустого стола
	 */
	isTableEmpty: (table: TableCardPair[]) => boolean;
};

const GameConditions: IGameConditions = {
	isGameEnd: ({ table, deckLength, handA, handB }) => {
		const cleanTable = table.flat().filter((id): id is CardId => id !== null);

		return (
			cleanTable.length === 0 &&
			deckLength === 0 &&
			(handA.length === 0 || handB.length === 0)
		);
	},

	isTableEmpty: (table) => table.length === 0,
};

export default GameConditions;