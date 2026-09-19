import { ReactNode, useState } from 'react';
import type { Card } from '@/types/GameTypes.ts';
import { PlayerControlsContext } from '@/ui/PlayerControlsContext.tsx';

type PlayerControlsProviderProps = {
	children: ReactNode;
};

const PlayerControlsProvider = ({ children } : PlayerControlsProviderProps) => {
	const [isRaiseDisabled, setRaiseDisabled] = useState<boolean>(true);
	const [isMoveToFallDisabled, setMoveToFallDisabled] = useState<boolean>(true);
	const [isEndMoveDisabled, setEndMoveDisabled] = useState<boolean>(true);

	const [chosenDefendCard, setChosenDefendCard] = useState<Card | undefined>(undefined);

	return (
		<PlayerControlsContext.Provider
			value={{
				isRaiseDisabled,
				setEndMoveDisabled,
				isMoveToFallDisabled,
				setRaiseDisabled,
				isEndMoveDisabled,
				setMoveToFallDisabled,
				setChosenDefendCard,
				chosenDefendCard,
			}}
		>
			{children}
		</PlayerControlsContext.Provider>
	);
};

export default PlayerControlsProvider;
