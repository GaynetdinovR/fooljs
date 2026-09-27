import { useContext } from 'react';
import styles from '@/styles/modules/Player.module.sass';
import classNames from 'classnames';

import { useTrumpCard } from '@/stores/deckStore.ts';
import { useHumanHand } from '@/stores/playersStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import useGameActionsHandler from '@/hooks/useGameActionsHandler.ts';

import CardService from '@/core/CardService.ts';

import Card from '@/ui/Card.tsx';
import { PlayerControlsContext } from '@/ui/PlayerControlsContext.tsx';

import type { CardId, GameStatus } from '@/types/GameTypes.ts';
import CardDatabase from '@/core/CardDatabase.ts';

const Player = () => {
	const trumpCard: CardId = useTrumpCard();
	const status: GameStatus = useStatus();
	const hand: CardId[] = useHumanHand();

	const handCardObjects = CardDatabase.tryGetCardsById(hand);
	const trumpCardObject = CardDatabase.tryGetCardById(trumpCard);

	const { isRaiseDisabled, isMoveToFallDisabled, isEndMoveDisabled, chosenDefendCard } =
		useContext(PlayerControlsContext);
	const { handleCardClick, handleRaiseClick, handleEndMoveClick, handleMoveToFallClick } =
		useGameActionsHandler();

	if (!trumpCardObject) return null;

	return (
		<div className={styles.player}>
			<div className={styles.player__cards}>
				{handCardObjects && CardService.sortCards(handCardObjects, trumpCardObject.suit).map((card) => {
					const shouldShowDefendStyle: boolean =
						status === 'bot-attack' &&
						chosenDefendCard &&
						card.id === chosenDefendCard;

					const cardClass: string = classNames(styles.player__card, {
						[styles.player__card_for_defend]: shouldShowDefendStyle,
					});

					return (
						<Card
							key={card.id}
							isClickable={true}
							className={cardClass}
							onClick={() => handleCardClick(card.id)}
							frontImage={card?.imgPath}
						/>
					);
				})}
			</div>

			<div className={styles.player__controls}>
				<button
					onClick={handleRaiseClick}
					className={styles.player__raise}
					disabled={isRaiseDisabled}
				>
					Поднять
				</button>
				<button
					onClick={handleEndMoveClick}
					className={styles.player__end_move}
					disabled={isEndMoveDisabled}
				>
					Закончить ход
				</button>

				<button
					onClick={handleMoveToFallClick}
					className={styles.player__move_to_fall}
					disabled={isMoveToFallDisabled}
				>
					Бито
				</button>
			</div>
		</div>
	);
};

export default Player;
