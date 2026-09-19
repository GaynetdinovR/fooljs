import toast from 'react-hot-toast';

import useStoreActions from '@/utils/hooks/useStoreActions.ts';

import useTableService from '@/hooks/useTableService.ts';

import type { Card as CardType} from '@/types/GameTypes.ts';

type PlayerActionsType = {
	/**
	 * Метод защиты игрока
	 */
	defend: (attackCard: CardType, defendCard: CardType) => void;
	/**
	 * Метод атаки игрока
	 */
	attack: (card: CardType) => void;
};

const usePlayerActions = (): PlayerActionsType => {
	const { isPossibleToAttack, isPossibleToDefend } = useTableService();
	const { attackWithCard, defendWithCard } = useStoreActions();

	const defend = (attackCard, defendCard) => {
		if (isPossibleToDefend(attackCard, defendCard)) {
			defendWithCard(attackCard.id, defendCard, 'human');
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
