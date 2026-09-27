import usePlayersStore from '@/stores/playersStore.ts';
import useDeckStore from '@/stores/deckStore.ts';
import useFallStore from '@/stores/fallStore.ts';
import useTableStore from '@/stores/tableStore.ts';
import useGameStore from '@/stores/gameStore.ts';
import useBotMemoryStore from '@/stores/botMemoryStore.ts';
import useMoveHistoryStore from '@/stores/moveHistoryStore.ts';

/**
 * Фасад над сторами для удобства.
 *
 * подписка идёт на весь стор (без селекторов).
 * Это осознанное решение, ререндеры не критичны для пет-проекта.
 */
const useGameData = () => {
	const { bot, human } = usePlayersStore();
	const { table } = useTableStore();
	const { deck, trumpCard } = useDeckStore();
	const { fall } = useFallStore();
	const { settings, status, turn } = useGameStore();
	const { history }= useMoveHistoryStore();

	return {
		bot,
		human,
		table,
		deck,
		trumpCard,
		fall,
		settings,
		status,
		turn,
		history
	};
};

export default useGameData;
