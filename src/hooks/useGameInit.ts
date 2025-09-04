import { useContext } from 'react';
import { AppContext } from '@/ui/AppProvider.tsx';
import useGameStore, { useSettings, useStatus } from '@/stores/gameStore.ts';

const useGameInit = () => {
	const { gameInit } = useContext(AppContext);
	const settings = useSettings();
	const status = useStatus();
	const { updateStatus } = useGameStore();

	const init = () => {
		if (status === 'dealing') return;
		gameInit.setSettings(settings);
		gameInit.initialize();
		updateStatus('dealing');
	}

	return { init };
}

export default useGameInit;