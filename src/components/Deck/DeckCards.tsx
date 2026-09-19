import styles from '@/styles/modules/Deck.module.sass';
import Card from '@/ui/Card.tsx';

type DeckCardsProps = {
	cardsCount: number;
};

const DeckCards = ({ cardsCount }: DeckCardsProps) => {
	return (
		<>
			{Array.from({ length: cardsCount }).map((_, i) => (
				<Card key={i} className={styles.deck__card} isClickable={false} />
			))}
		</>
	);
};

export default DeckCards;
