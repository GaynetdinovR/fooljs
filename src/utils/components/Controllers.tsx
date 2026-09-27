import GameController from '@/controllers/GameController.tsx';
import NotificationsController from '@/controllers/NotificationsController.tsx';
import BotController from '@/controllers/BotController.tsx';
import PlayerController from '@/controllers/PlayerController.tsx';

const Controllers = () => {
	return (
		<>
			<GameController />
			<NotificationsController />
			<BotController />
			<PlayerController />
		</>
	);
};

export default Controllers;
