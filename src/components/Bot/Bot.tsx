import styles from '@/styles/modules/Bot.module.sass';

import { useBotHand } from '@/stores/playersStore.ts';

import type { Card as CardType, CardId } from '@/types/GameTypes.ts';

import Card from '@/ui/Card.tsx';
import CardDatabase from '@/core/CardDatabase.ts';

const Bot = () => {
	const hand: CardId[] = useBotHand();

	const handCardObjects = CardDatabase.getCardsById(hand);

	return (
		<div className={styles.bot}>
			{handCardObjects.map((card: CardType) => {
				return (
					<Card
						key={card.id}
						frontImage={card.imgPath}
						isClickable={false}
						className={styles.bot__card}
					/>
				);
			})}
		</div>
	);
};

export default Bot;
