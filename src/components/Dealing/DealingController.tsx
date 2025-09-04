import { useStatus } from '@/stores/gameStore.ts';
import { useEffect } from 'react';
import useDealing from '@/hooks/useDealing.ts';

// Контроллер, объединяющий логику и анимацию раздачи карт
const DealingController = () => {
	const { startDealing } = useDealing();

	const status = useStatus();

	useEffect(() => {
		if (status === 'dealing') startDealing();
	}, [status]);

	return null;
};

export default DealingController;