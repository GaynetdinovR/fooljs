import styles from '@/styles/modules/Table.module.sass';
import Card from '@/ui/Card.tsx';
import { useTable } from '@/stores/tableStore.ts';

const Table = () => {
	const table = useTable();

	return (
		<div className={styles.table}>
			{
				table.map((cardPair, i) => {
					const [cardToBeat, cardToDefend] = cardPair;

					const handleClick = () => {
						//some shit with card
					};

					return (
						<div key={`table_card_pair_${i}`} className={styles.table__card_pair}>
							<Card isClickable={!cardToBeat.isBeaten} onClick={handleClick}
								  className={styles.table__card_to_beat}
								  frontImage={cardToBeat.imgPath} />
							{cardToBeat.isBeaten && (
								<Card isClickable={false} className={styles.table__card_to_defend}
									  frontImage={cardToDefend.imgPath} />
							)}
						</div>
					);
				})
			}
		</div>

	);
};

export default Table;