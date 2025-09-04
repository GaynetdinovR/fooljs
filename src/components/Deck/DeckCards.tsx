import Card from '@/ui/Card.tsx';
import styles from '@/styles/modules/Deck.module.sass';

type DeckCardsProps = {
	cardsCount: number
}

const DeckCards = ({ cardsCount }: DeckCardsProps) => {
	return (<>
		{
			Array.from({ length: cardsCount }).map((_, i) => (
				<Card
					key={i}
					className={styles.deck__card}
					isClickable={false}
				/>
			))
		}
	</>);
};

export default DeckCards;