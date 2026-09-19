import { useDeck, useTrumpCard } from '@/stores/deckStore.ts';
import NullCard from '@/ui/NullCard.tsx';
import Card from '@/ui/Card.tsx';
import styles from '@/styles/modules/Deck.module.sass';

import type { Card as CardType } from '@/types/GameTypes.ts';

const TrumpCard = () => {
	const deck: CardType[] = useDeck();
	const trumpCard: CardType = useTrumpCard();

	const isTrumpCardNotExists: boolean = !trumpCard;
	const isDeckEmpty: boolean = deck.length === 0;

	if (isTrumpCardNotExists) return;
	if (isDeckEmpty) return <NullCard frontImage={trumpCard.imgPath} />;

	return (
		<Card
			className={styles.deck__trump_card}
			frontImage={trumpCard?.imgPath}
			isClickable={false}
		/>
	);
};

export default TrumpCard;
