import styles from '@/styles/modules/Menu.module.sass';
import useGameStore from '@/stores/gameStore.ts';
import GameModeSelector from '@/components/Menu/components/GameModeSelector.tsx';
import CardsCountSelector from '@/components/Menu/components/CardsCountSelector.tsx';
import AiModeSelector from '@/components/Menu/components/AiModeSelector.tsx';

const GameData = ({ isGameOn }: { isGameOn: boolean }) => {
	const { updateSettings } = useGameStore();

	return (
		<div className={styles.menu__game_data}>
			<GameModeSelector
				updateSettings={updateSettings}
				isGameOn={isGameOn}
			/>
			<span className={styles.menu__game_data_name}> Количество игроков </span>
			<span className={styles.menu__game_data_span}>2</span>
			<CardsCountSelector
				updateSettings={updateSettings}
				isGameOn={isGameOn}
			/>
			<AiModeSelector
				updateSettings={updateSettings}
				isGameOn={isGameOn}
			/>
		</div>
	);
};

export default GameData;