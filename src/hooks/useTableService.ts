import TableService from '@/core/TableService.ts';
import type { TableCard } from '@/types/store/TableStoreType.ts';
import type { Players } from '@/types/GameTypes.ts';
import { useTable } from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';

const useTableService = () => {
	const table = useTable();
	const players = usePlayersStore();

	const isPossibleToAttack = (card: TableCard, attackedPlayer: Players) => {
		return TableService.isPossibleToAttack(card, table, players[attackedPlayer].length)
	}

	return {
		isPossibleToAttack
	}
};

export default useTableService;