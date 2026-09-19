import styles from '@/styles/modules/Bot.module.sass';

import { useBotHand } from '@/stores/playersStore.ts';

import type { Card as CardType } from '@/types/GameTypes.ts';

import Card from '@/ui/Card.tsx';

const Bot = () => {
	const hand: CardType[] = useBotHand();

	return (
		<div className={styles.bot}>
			{hand.map((card: CardType) => {
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
