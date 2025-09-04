import styles from '@/styles/modules/Fall.module.sass';
import DeckService from '@/core/DeckService.ts';
import Card from '@/ui/Card.tsx';
import { useFall } from '@/stores/fallStore.ts';

const Fall = () => {
	const fall = useFall();

	const isFallEmpty = fall.length === 0;
	const cardsCount = DeckService.getSmalledCardsCountForFall(fall);

	return (<>
		<div className={styles.fall}>
			<span className={styles.fall__count}>{fall.length}</span>

			<div className={styles.fall__cards}>
				{isFallEmpty && (
					<div className={styles.fall__null_card}>
						<img src="content/back.png" alt="card" className={styles.fall__null_card_img} />
					</div>
				)}
				{
					Array.from({ length: cardsCount }).map((_, i) => (
						<Card
							key={i}
							className={styles.fall__card}
							isClickable={false}
						/>
					))
				}
			</div>
		</div>
	</>);
};

export default Fall;