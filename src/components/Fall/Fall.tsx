import styles from '@/styles/modules/Fall.module.sass';
import { getSmalledCardsCountForFall } from '@/utils/view.ts';

import { useFall } from '@/stores/fallStore.ts';

import NullCard from '@/ui/NullCard.tsx';
import Card from '@/ui/Card.tsx';

import type { Card as CardType } from '@/types/GameTypes.ts';

const Fall = () => {
	const fall: CardType[] = useFall();

	const isFallEmpty: boolean = fall.length === 0;
	const cardsCount: number = getSmalledCardsCountForFall(fall);

	return (
		<>
			<div className={styles.fall}>
				<span className={styles.fall__count}>{fall.length}</span>

				<div className={styles.fall__cards}>
					{isFallEmpty ? (
						<NullCard />
					) : (
						Array.from({ length: cardsCount }).map((_, i) => (
							<Card key={i} className={styles.fall__card} isClickable={false} />
						))
					)}
				</div>
			</div>
		</>
	);
};

export default Fall;
