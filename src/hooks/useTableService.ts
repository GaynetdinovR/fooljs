import TableService from '@/core/TableService.ts';

import { useTable } from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import { useTrumpCard } from '@/stores/deckStore.ts';

import type { Card as CardType, Players } from '@/types/GameTypes.ts';
import CardDatabase from '@/core/CardDatabase.ts';
import GameDataResolver from '@/core/GameDataResolver.ts';

type TableServiceType = {
	/**
	 * Метод проверки возможности атаковать картой
	 */
	isPossibleToAttack: (card: CardType, attackedPlayer: Players) => boolean;
	/**
	 * Метод проверки возможности защититься картой
	 */
	isPossibleToDefend: (attackCard: CardType, defendCard: CardType) => boolean;
};

const useTableService = (): TableServiceType => {
	const table = useTable();
	const trumpCard = useTrumpCard();
	const players = usePlayersStore();

	const isPossibleToAttack = (card, attackedPlayer) => {
		const attackCard = CardDatabase.getCardById(card);
		const tableCards = GameDataResolver.resolveTablePairs(table);

		return TableService.isPossibleToAttack(attackCard, tableCards, players[attackedPlayer].length);
	};

	const isPossibleToDefend = (attackCard, defendCard) => {
		const attackCardObject = CardDatabase.getCardById(attackCard);
		const defendCardObject = CardDatabase.getCardById(defendCard);

		if(!trumpCard) return false;
		const trumpCardObject = CardDatabase.getCardById(trumpCard);

		return TableService.isPossibleToDefend(attackCardObject, defendCardObject, trumpCardObject.suit);
	};

	return {
		isPossibleToAttack,
		isPossibleToDefend,
	};
};

export default useTableService;
