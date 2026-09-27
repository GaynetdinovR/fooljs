import styles from '@/styles/modules/Table.module.sass';
import { useContext } from 'react';

import { useTable } from '@/stores/tableStore.ts';
import { useStatus } from '@/stores/gameStore.ts';
import useGameActionsHandler from '@/hooks/useGameActionsHandler.ts';

import Card from '@/ui/Card.tsx';
import { PlayerControlsContext } from '@/ui/PlayerControlsContext.tsx';

import type { TableCardPair } from '@/types/store/TableStoreType.ts';
import type { GameStatus } from '@/types/GameTypes.ts';
import { resolveTablePairs } from '@/utils/tableResolver.ts';
import { TableCardObjectsPair } from '@/types/core/ITableService.ts';

const Table = () => {
	const table: TableCardPair[] = useTable();
	const status: GameStatus = useStatus();

	const tableCardObjects: TableCardObjectsPair[] = resolveTablePairs(table, 'save');

	const { chosenDefendCard } = useContext(PlayerControlsContext);
	const { handleTableCardClick } = useGameActionsHandler();

	return (
		<div className={styles.table}>
			{tableCardObjects.map((cardPair: TableCardObjectsPair, i: number) => {
				const [attackCard, defendCard] = cardPair;

				const isCardClickable: boolean =
					!defendCard && status === 'bot-attack' && chosenDefendCard;

				return (
					<div key={`table_card_pair_${i}`} className={styles.table__card_pair}>
						<Card
							isClickable={isCardClickable}
							onClick={() => handleTableCardClick(attackCard.id, chosenDefendCard)}
							className={styles.table__card_to_beat}
							frontImage={attackCard.imgPath}
						/>
						{defendCard && (
							<Card
								isClickable={false}
								className={styles.table__card_to_defend}
								frontImage={defendCard.imgPath}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Table;
