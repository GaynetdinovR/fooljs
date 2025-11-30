import usePlayersStore from '@/stores/playersStore.ts';
import useDeckStore from '@/stores/deckStore.ts';
import useFallStore from '@/stores/fallStore.ts';
import useTableStore from '@/stores/tableStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import { useCallback } from 'react';

const useGameData = () => {
	const { bot, human } = usePlayersStore();
	const { table} = useTableStore();
	const { deck, trumpCard } = useDeckStore();
	const { fall } = useFallStore();
	const { settings, status, turn } = useGameStore();

	return {
		bot, human, table, deck, trumpCard, fall, settings, status, turn
	}
};

export default useGameData;