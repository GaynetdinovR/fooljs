import { usePlayerControls } from '@/ui/PlayerControlsContext.tsx';

import useGameLogic from '@/hooks/useGameLogic.ts';
import usePlayerActions from '@/hooks/usePlayerActions.ts';

import { useStatus } from '@/stores/gameStore.ts';

import type { CardId } from '@/types/GameTypes.ts';

type GameActionsHandlerType = {
	handleCardClick: (card: CardId) => void;
	handleRaiseClick: () => void;
	handleMoveToFallClick: () => void;
	handleEndMoveClick: () => void;
	handleTableCardClick: (attackCard: CardId | undefined, defendCard: CardId | undefined) => void;
};

/**
 * Хук объединяет действия игрока и методы логики, отключает кнопки
 */
const useGameActionsHandler = (): GameActionsHandlerType => {
	const status = useStatus();
	const { attack, defend } = usePlayerActions();
	const { moveToFallActions, raiseActions, endMoveActions } = useGameLogic();

	const { setMoveToFallDisabled, setChosenDefendCard, setRaiseDisabled, setEndMoveDisabled } =
		usePlayerControls();

	const handleCardClick = (card) => {
		switch (status) {
			case 'human-attack':{
				attack(card);
				return setMoveToFallDisabled(true);
			}
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

		setChosenDefendCard(undefined);
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
		if(!attackCard || !defendCard) return;

		defend(attackCard, defendCard);

		setChosenDefendCard(undefined);
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
