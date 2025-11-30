import styles from '@/styles/modules/Table.module.sass';
import Card from '@/ui/Card.tsx';
import { useTable } from '@/stores/tableStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import { useContext } from 'react';
import { PlayerControlsContext } from '@/ui/PlayerControlsProvider.tsx';
import usePlayerActions from '@/hooks/usePlayerActions.ts';
import useGameActionsHandler from '@/hooks/useGameActionsHandler.ts';

const Table = () => {
	const table = useTable();
	const status = useStatus();

	const { chosenDefendCard } = useContext(PlayerControlsContext);
	const { handleTableCardClick } = useGameActionsHandler();

	return (
		<div className={styles.table}>
			{
				table.map((cardPair, i) => {
					const [attackCard, defendCard] = cardPair;

					const isCardClickable = !attackCard.isBeaten && status === 'bot-attack' && chosenDefendCard;

					return (
						<div key={`table_card_pair_${i}`} className={styles.table__card_pair}>
							<Card isClickable={isCardClickable} onClick={() => handleTableCardClick(attackCard, chosenDefendCard)}
								  className={styles.table__card_to_beat}
								  frontImage={attackCard.imgPath} />
							{attackCard.isBeaten && (
								<Card isClickable={false} className={styles.table__card_to_defend}
									  frontImage={defendCard.imgPath} />
							)}
						</div>
					);
				})
			}
		</div>

	);
};

export default Table;