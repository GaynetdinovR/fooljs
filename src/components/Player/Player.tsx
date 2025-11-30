import styles from '@/styles/modules/Player.module.sass';
import { useHumanHand } from '@/stores/playersStore.ts';
import usePlayerActions from '@/hooks/usePlayerActions.ts';
import Card from '@/ui/Card.tsx';
import { useContext } from 'react';
import { PlayerControlsContext } from '@/ui/PlayerControlsProvider.tsx';
import CardService from '@/core/CardService.ts';
import { useTrumpCard } from '@/stores/deckStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import classNames from 'classnames';
import useGameActionsHandler from '@/hooks/useGameActionsHandler.ts';

const Player = () => {
	const trumpCard = useTrumpCard();
	const status = useStatus();
	const hand = useHumanHand();

	const { isRaiseDisabled, isMoveToFallDisabled, isEndMoveDisabled, chosenDefendCard } = useContext(PlayerControlsContext);
	const { handleCardClick, handleRaiseClick, handleEndMoveClick, handleMoveToFallClick } = useGameActionsHandler();

	if (!trumpCard) return null;

	return (
		<div className={styles.player}>
			<div className={styles.player__cards}>
				{CardService.sortCards(hand, trumpCard.suit).map(card => {
					const shouldShowDefendStyle = status === 'bot-attack' && chosenDefendCard && card.id == chosenDefendCard.id;

					const cardClass = classNames(
						styles.player__card,
						{ [styles.player__card_for_defend]: shouldShowDefendStyle },
					);

					return (
						<Card
							key={card.id}
							isClickable={true}
							className={cardClass}
							onClick={() => handleCardClick(card)}
							frontImage={card?.imgPath}
						/>
					);
				})}
			</div>

			<div className={styles.player__controls}>
				<button onClick={handleRaiseClick} className={styles.player__raise}
						disabled={isRaiseDisabled}>Поднять
				</button>
				<button onClick={handleEndMoveClick} className={styles.player__end_move}
						disabled={isEndMoveDisabled}>Закончить ход
				</button>

				<button onClick={handleMoveToFallClick} className={styles.player__move_to_fall}
						disabled={isMoveToFallDisabled}>Бито
				</button>
			</div>
		</div>
	);
};

export default Player;