import toast from 'react-hot-toast';

import useStoreActions from '@/utils/hooks/useStoreActions.ts';

import useTableService from '@/hooks/useTableService.ts';

import type { CardId } from '@/types/GameTypes.ts';

type PlayerActionsType = {
	/**
	 * Метод защиты игрока
	 */
	defend: (attackCard: CardId, defendCard: CardId) => void;
	/**
	 * Метод атаки игрока
	 */
	attack: (card: CardId) => void;
};

const usePlayerActions = (): PlayerActionsType => {
	const { isPossibleToAttack, isPossibleToDefend } = useTableService();
	const { attackWithCard, defendWithCard } = useStoreActions();

	const defend = (attackCard, defendCard) => {
		if (isPossibleToDefend(attackCard, defendCard)) {
			defendWithCard(attackCard, defendCard, 'human');
		} else {
			toast.error(`Недопустимый ход!`);
		}
	};

	const attack = (card) => {
		if (isPossibleToAttack(card, 'bot')) {
			attackWithCard(card, 'human');
		} else {
			toast.error(`Недопустимый ход!`);
		}
	};

	return {
		attack,
		defend,
	};
};

export default usePlayerActions;
