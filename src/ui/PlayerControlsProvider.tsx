import { createContext, ReactNode, useState } from 'react';
import type { Card } from '@/types/GameTypes.ts';

type PlayerControlsProviderProps = {
	children: ReactNode,
}

export const PlayerControlsContext = createContext();

const PlayerControlsProvider = ({ children }): PlayerControlsProviderProps => {
	const [isRaiseDisabled, setRaiseDisabled] = useState<boolean>(true);
	const [isMoveToFallDisabled, setMoveToFallDisabled] = useState<boolean>(true);
	const [isEndMoveDisabled, setEndMoveDisabled] = useState<boolean>(true);

	const [chosenDefendCard, setChosenDefendCard] = useState<Card | null>(null);

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
				chosenDefendCard
			}}
		>
			{children}
		</PlayerControlsContext.Provider>
	);
};

export default PlayerControlsProvider;