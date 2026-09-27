import { useDeck, useTrumpCard } from '@/stores/deckStore.ts';
import NullCard from '@/ui/NullCard.tsx';
import Card from '@/ui/Card.tsx';
import styles from '@/styles/modules/Deck.module.sass';

import type { CardId } from '@/types/GameTypes.ts';
import CardDatabase from '@/core/CardDatabase.ts';

const TrumpCard = () => {
	const deck: CardId[] = useDeck();
	const trumpCard: CardId = useTrumpCard();

	const trumpCardObject = CardDatabase.tryGetCardById(trumpCard);

	const isDeckEmpty: boolean = deck.length === 0;

	if (!trumpCardObject) return;
	if (isDeckEmpty) return <NullCard frontImage={trumpCardObject.imgPath} />;

	return (
		<Card
			className={styles.deck__trump_card}
			frontImage={trumpCardObject?.imgPath}
			isClickable={false}
		/>
	);
};

export default TrumpCard;
