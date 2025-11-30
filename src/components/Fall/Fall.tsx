import styles from '@/styles/modules/Fall.module.sass';
import DeckService from '@/core/DeckService.ts';
import Card from '@/ui/Card.tsx';
import { useFall } from '@/stores/fallStore.ts';
import NullCard from '@/ui/NullCard.tsx';

const Fall = () => {
	const fall = useFall();

	const isFallEmpty = fall.length === 0;
	const cardsCount = DeckService.getSmalledCardsCountForFall(fall);

	return (<>
		<div className={styles.fall}>
			<span className={styles.fall__count}>{fall.length}</span>

			<div className={styles.fall__cards}>
				{isFallEmpty ? <NullCard /> :
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