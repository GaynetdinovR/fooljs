import styles from '@/styles/modules/Deck.module.sass';
import { useDeck } from '@/stores/deckStore.ts';
import DeckService from '@/core/DeckService.ts';
import DeckCards from '@/components/Deck/DeckCards.tsx';
import TrumpCard from '@/components/Deck/TrumpCard.tsx';

const Deck = () => {
	const deck = useDeck();
	const cardsCount = DeckService.getSmalledCardsCountForDeck(deck);

	return (<>
		<div className={styles.deck}>
			<span className={styles.deck__count}>{deck.length}</span>

			<div className={styles.deck__cards}>
				<TrumpCard />
				<DeckCards cardsCount={cardsCount} />
			</div>
		</div>
	</>);
};

export default Deck;