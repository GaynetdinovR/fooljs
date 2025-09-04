import { useEffect, useState } from 'react';
import { useStatus } from '@/stores/gameStore.ts';
import toast from 'react-hot-toast';

const NotificationsController = () => {
	const status = useStatus();
	const [toastId, setToastId] = useState(null);

	useEffect(() => {

		if(status == 'dealing') setToastId(toast.loading('Раздача карт'));
		if(status == 'dealt') {
			toast.remove(toastId);
			toast.success('Игра началась!');
		}
		if(status == 'human-attack') toast('Вы атакуете!')
		if(status == 'bot-attack') toast('ИИ атакует!')

	}, [status]);

	return null;
};

export default NotificationsController;