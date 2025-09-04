import styles from '@/styles/modules/Player.module.sass';
import { useHumanHand } from '@/stores/playersStore.ts';
import usePlayerActions from '@/hooks/usePlayerActions.ts';
import Card from '@/ui/Card.tsx';

const Player = () => {
	const {
		handleCardClick,
		handleRaise,
		handleMoveToFall,
		handleEndMove,
		buttonsDisabled,
	} = usePlayerActions();

	const hand = useHumanHand();


	return (
		<div className={styles.player}>
			<div className={styles.player__cards}>
				{hand.map(card=> (
					<Card
						key={card?.id}
						isClickable={true}
						className={styles.player__card}
						onClick={() => handleCardClick(card)}
						frontImage={card?.imgPath}
					/>
				))}
			</div>

			<div className={styles.player__controls}>
				<button onClick={handleRaise} className={styles.player__raise}
						disabled={buttonsDisabled.raise}>Поднять
				</button>

				<button onClick={handleMoveToFall} className={styles.player__move_to_fall}
						disabled={buttonsDisabled.moveToFall}>Бито
				</button>

				<button onClick={handleEndMove} className={styles.player__end_move}
						disabled={buttonsDisabled.endMove}>Всё
				</button>
			</div>
		</div>
	);
};

export default Player;