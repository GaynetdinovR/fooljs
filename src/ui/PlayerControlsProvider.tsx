import { ReactNode, useMemo, useState } from 'react';
import type { CardId } from '@/types/GameTypes.ts';
import type { PlayerControls } from '@/ui/PlayerControlsContext.tsx';
import { PlayerControlsContext } from '@/ui/PlayerControlsContext.tsx';

type PlayerControlsProviderProps = {
	children: ReactNode;
};

const PlayerControlsProvider = ({ children }: PlayerControlsProviderProps) => {
	const [isRaiseDisabled, setRaiseDisabled] = useState<boolean>(true);
	const [isMoveToFallDisabled, setMoveToFallDisabled] = useState<boolean>(true);
	const [isEndMoveDisabled, setEndMoveDisabled] = useState<boolean>(true);

	const [chosenDefendCard, setChosenDefendCard] = useState<CardId | undefined>(undefined);

	const controls: PlayerControls = useMemo(() => ({
		isRaiseDisabled,
		setEndMoveDisabled,
		isMoveToFallDisabled,
		setRaiseDisabled,
		isEndMoveDisabled,
		setMoveToFallDisabled,
		setChosenDefendCard,
		chosenDefendCard,
	}), [isRaiseDisabled, isMoveToFallDisabled, isEndMoveDisabled, chosenDefendCard]);

	return (
		<PlayerControlsContext.Provider value={controls}>
			{children}
		</PlayerControlsContext.Provider>
	);
};

export default PlayerControlsProvider;
