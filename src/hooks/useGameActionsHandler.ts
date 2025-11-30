import useGameLogic from '@/hooks/useGameLogic.ts';
import { useContext } from 'react';
import { PlayerControlsContext } from '@/ui/PlayerControlsProvider.tsx';
import { useStatus } from '@/stores/gameStore.ts';
import usePlayerActions from '@/hooks/usePlayerActions.ts';
import type { Card } from '@/types/GameTypes.ts';

type GameActionsHandlerType = {
	handleCardClick: (card: Card) => void;
	handleRaiseClick: () => void;
	handleMoveToFallClick: () => void;
	handleEndMoveClick: () => void;
	handleTableCardClick: (attackCard: Card, defendCard: Card) => void;
}

// Хук объединяет действия игрока и методы логики, отключает кнопки
const useGameActionsHandler = (): GameActionsHandlerType => {
	const status = useStatus();
	const { attack, defend } = usePlayerActions();
	const { moveToFallActions, raiseActions, endMoveActions } = useGameLogic();

	const { setMoveToFallDisabled, setChosenDefendCard, setRaiseDisabled, setEndMoveDisabled } = useContext(PlayerControlsContext);

	const handleCardClick = (card) => {
		switch (status) {
			case 'human-attack':
			case 'bot-raising': {
				return attack(card);
			}
			case 'bot-attack': {
				return setChosenDefendCard(card);
			}
		}
	};

	const handleRaiseClick = () => {
		raiseActions('human');

		setChosenDefendCard(null);
		setRaiseDisabled(true);
	};

	const handleMoveToFallClick = async () => {
		await moveToFallActions();

		setMoveToFallDisabled(true);
	};

	const handleEndMoveClick = () => {
		endMoveActions('human');

		setEndMoveDisabled(true);
	};

	const handleTableCardClick = (attackCard, defendCard) => {
		defend(attackCard, defendCard);

		setChosenDefendCard(null);
	};

	return {
		handleCardClick,
		handleRaiseClick,
		handleMoveToFallClick,
		handleEndMoveClick,
		handleTableCardClick,
	};
};

export default useGameActionsHandler;