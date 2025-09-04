import { useBotHand } from '@/stores/playersStore.ts';
import Card from '@/ui/Card.tsx';
import styles from '@/styles/modules/Bot.module.sass';

const Bot = () => {
	const hand = useBotHand();

	return (
		<div className={styles.bot}>
			{hand.map(card => {
				return (
					<Card key={card.id} frontImage={card.imgPath} isClickable={false} className={styles.bot__card} />
				);
			})}
		</div>
	);
};

export default Bot;