import useStoreActions from '@/utils/hooks/useStoreActions.ts';

const useClearAll = () => {
	const { clearDeck, clearFall, clearPlayers, clearTable, clearMoveHistory } = useStoreActions();

	const clearAll = () => {
		clearDeck();
		clearFall();
		clearPlayers();
		clearTable();
		clearMoveHistory();
	};

	return {
		clearAll,
	};
};

export default useClearAll;
