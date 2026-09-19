import styles from '@/styles/modules/Deck.module.sass';
import { getSmalledCardsCountForDeck } from '@/utils/view.ts';

import { useDeck } from '@/stores/deckStore.ts';

import DeckCards from '@/components/Deck/DeckCards.tsx';
import TrumpCard from '@/components/Deck/TrumpCard.tsx';

import type { Card as CardType } from '@/types/GameTypes.ts';

const Deck = () => {
	const deck: CardType[] = useDeck();
	const cardsCount = getSmalledCardsCountForDeck(deck);

	return (
		<>
			<div className={styles.deck}>
				<span className={styles.deck__count}>{deck.length}</span>

				<div className={styles.deck__cards}>
					<TrumpCard />
					<DeckCards cardsCount={cardsCount} />
				</div>
			</div>
		</>
	);
};

export default Deck;
