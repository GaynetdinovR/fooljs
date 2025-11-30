import { useEffect } from 'react';
import { useTable } from '@/stores/tableStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import useBotMemory from '@/hooks/useBotMemory.ts';
import TableService from '@/core/TableService.ts';

const BotMemoryController = () => {
    const table = useTable();
    const status = useStatus();
    const { addRaisedCards, removeUsedRaisedCards, addBeatenCards } = useBotMemory();

    const tableCards = TableService.getAllCards(table);

    const onMoveToFall = () => {
        removeUsedRaisedCards(tableCards);

        addBeatenCards(table);
    }

    useEffect(() => {
        if(status === 'human-raising') addRaisedCards(tableCards)
        if(status === 'move-to-fall') onMoveToFall()
    }, [status, table]);

	return null;
};

export default BotMemoryController;