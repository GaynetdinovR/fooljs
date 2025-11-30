import useTableService from '@/hooks/useTableService.ts';
import toast from 'react-hot-toast';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import type { Card } from '@/types/GameTypes.ts';

type PlayerActionsType = {
	defend: (attackCard: Card, defendCard: Card) => void;
	attack: (card: Card) => void;
}

const usePlayerActions = (): PlayerActionsType => {
	const { isPossibleToAttack, isPossibleToDefend } = useTableService();
	const { attackWithCard, defendWithCard } = useStoreActions()

	// Метод защиты игрока
	const defend = (attackCard, defendCard)=> {
		if(isPossibleToDefend(attackCard, defendCard)){
			defendWithCard(attackCard.id, defendCard, 'human');
		} else {
			toast.error(`Недопустимый ход!`)
		}
	};

	// Метод атаки игрока
	const attack = (card) => {
		if(isPossibleToAttack(card, 'bot')){
			attackWithCard(card, 'human');
		} else {
			toast.error(`Недопустимый ход!`)
		}
	};

	return {
		attack,
		defend
	};
};

export default usePlayerActions;