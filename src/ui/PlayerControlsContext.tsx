import type { CardId } from '@/types/GameTypes.ts';
import { createContext, useContext } from 'react';

export type PlayerControls = {
	isRaiseDisabled: boolean;
	setEndMoveDisabled: (p: boolean) => void;
	isMoveToFallDisabled: boolean;
	setRaiseDisabled: (p: boolean) => void;
	isEndMoveDisabled: boolean;
	setMoveToFallDisabled: (p: boolean) => void;
	setChosenDefendCard: (p: CardId | undefined) => void;
	chosenDefendCard: CardId | undefined;
};

export const PlayerControlsContext = createContext<PlayerControls | undefined>(undefined);

export const usePlayerControls = (): PlayerControls => {
	const context = useContext(PlayerControlsContext);
	if (context === undefined) {
		throw new Error('usePlayerControls must be used within a PlayerControlsProvider');
	}
	return context;
};