import styles from '@/styles/modules/Deck.module.sass';
import { useDeck, useTrumpCard } from '@/stores/deckStore.ts';
import DeckService from '@/core/DeckService.ts';
import Card from '@/ui/Card.tsx';
import DeckCards from '@/components/Deck/DeckCards.tsx';

const Deck = () => {
	const deck = useDeck();
	const trumpCard = useTrumpCard();
	const cardsCount = DeckService.getSmalledCardsCountForDeck(deck);

	const isTrumpCardExists: boolean = trumpCard !== null;

	return (<>
		<div className={styles.deck}>
			<span className={styles.deck__count}>{deck.length}</span>

			<div className={styles.deck__cards}>
				{
					isTrumpCardExists && (
						<Card className={styles.deck__trump_card} frontImage={trumpCard?.imgPath} isClickable={false} />)
				}
				<DeckCards cardsCount={cardsCount}/>
			</div>
		</div>
	</>);
};

export default Deck;