import useDeckStore from '@/stores/deckStore.ts';
import useTableStore from '@/stores/tableStore.ts';
import usePlayersStore from '@/stores/playersStore.ts';
import useFallStore from '@/stores/fallStore.ts';
import useGameStore from '@/stores/gameStore.ts';

const useReset = () => {
	const { clearAll: clearDeck } = useDeckStore();
	const { clearAll: clearFall } = useFallStore();
	const { clearAll: clearPlayers } = usePlayersStore();
	const { clearAll: clearTable } = useTableStore();

	const resetAll = () => {
		clearDeck();
		clearFall();
		clearPlayers();
		clearTable();
	}

	return {
		resetAll
	}
};

export default useReset;