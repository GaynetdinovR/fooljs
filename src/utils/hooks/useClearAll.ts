import useStoreActions from '@/utils/hooks/useStoreActions.ts';

const useClearAll = () => {
	const {
		clearDeck,
		clearFall,
		clearPlayers,
		clearTable,
	} = useStoreActions();

	const clearAll = () => {
		clearDeck();
		clearFall();
		clearPlayers();
		clearTable();
	};

	return {
		clearAll,
	};
};

export default useClearAll;