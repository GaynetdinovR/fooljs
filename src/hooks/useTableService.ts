import TableService from '@/core/TableService.ts';

import { useTable } from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import { useTrumpCard } from '@/stores/deckStore.ts';

import type { Card as CardType, Players } from '@/types/GameTypes.ts';
import type { TableCard } from '@/types/store/TableStoreType.ts';

type TableServiceType = {
	/**
	 * Метод проверки возможности атаковать картой
	 */
	isPossibleToAttack: (card: TableCard, attackedPlayer: Players) => boolean;
	/**
	 * Метод проверки возможности защититься картой
	 */
	isPossibleToDefend: (attackCard: TableCard, defendCard: CardType) => boolean;
};

const useTableService = (): TableServiceType => {
	const table = useTable();
	const trumpCard = useTrumpCard();
	const players = usePlayersStore();

	const isPossibleToAttack = (card, attackedPlayer) => {
		return TableService.isPossibleToAttack(card, table, players[attackedPlayer].length);
	};

	const isPossibleToDefend = (attackCard, defendCard) => {
		return TableService.isPossibleToDefend(attackCard, defendCard, trumpCard.suit);
	};

	return {
		isPossibleToAttack,
		isPossibleToDefend,
	};
};

export default useTableService;
