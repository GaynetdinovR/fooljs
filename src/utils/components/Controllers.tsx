import GameController from '@/controllers/GameController.tsx';
import NotificationsController from '@/controllers/NotificationsController.tsx';
import DealingController from '@/components/Dealing/DealingController.tsx';

const Controllers = () => {
	return (<>
        <GameController />
        <NotificationsController />
        <DealingController />
	</>);
};

export default Controllers;