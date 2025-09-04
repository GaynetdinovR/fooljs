import { useStatus } from '@/stores/gameStore.ts';
import useTableStore from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import useTableService from '@/hooks/useTableService.ts';
import toast from 'react-hot-toast';
import { useState } from 'react';

type ButtonsDisabled = {
	raise: boolean,
	moveToFall: boolean,
	endMove: boolean
}

const usePlayerActions = () => {
	const status = useStatus();

	const [buttonsDisabled, setButtons] = useState<ButtonsDisabled>({
		raise: true,
		moveToFall: true,
		endMove: true,
	});

	const { addCardToBeat } = useTableStore();
	const { removeCardFromPlayer } = usePlayersStore();
	const { isPossibleToAttack } = useTableService();

	const defend = (card) => {

	};

	const attack = async (card) => {
		if(isPossibleToAttack(card, 'bot')){
			removeCardFromPlayer('human', card);

			addCardToBeat(card);

			setButtons(prev => ({...prev, endMove: false}))
		} else {
			toast.error(`Недопустимый ход!`)
		}
	};

	const handleCardClick = (card) => {
		if (!['human-attack', 'bot-attack'].includes(status)) return;

		if (status == 'human-attack') return attack(card);
		if (status == 'bot-attack') return defend(card);
	};

	const handleMoveToFall = () => {
	};

	const handleRaise = () => {
	};

	const handleEndMove = () => {
		setButtons(prev => ({...prev, endMove: true}))
	};

	return {
		handleCardClick,
		handleRaise,
		handleMoveToFall,
		handleEndMove,
		buttonsDisabled
	};
};

export default usePlayerActions;