import TableService from '@/core/TableService.ts';
import type { TableCard } from '@/types/store/TableStoreType.ts';
import type { Card, Players } from '@/types/GameTypes.ts';
import { useTable } from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import { useTrumpCard } from '@/stores/deckStore.ts';

type TableServiceType = {
	isPossibleToAttack: (card: TableCard, attackedPlayer: Players) => boolean;
	isPossibleToDefend: (attackCard: TableCard, defendCard: Card) => boolean;
}

const useTableService = (): TableServiceType => {
	const table = useTable();
	const trumpCard = useTrumpCard()
	const players = usePlayersStore();

	// Метод проверки возможности атаковать картой
	const isPossibleToAttack = (card, attackedPlayer) => {
		return TableService.isPossibleToAttack(card, table, players[attackedPlayer].length)
	}

	// Метод проверки возможности защититься картой
	const isPossibleToDefend = (attackCard, defendCard) => {
		return TableService.isPossibleToDefend(attackCard, defendCard, trumpCard.suit);
	}

	return {
		isPossibleToAttack,
		isPossibleToDefend
	}
};

export default useTableService;