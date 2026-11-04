import type { CardsCountType, Card as CardType } from '@/types/GameTypes.ts';

type ICardClassification = {
	/**
	 * Классификация карт(разная при 24/36/52 колоде):
	 * При 52 колоде:
	 * 2-6 - мелкие
	 * 7-10 - средние
	 * валет-туз - крупные
	 * При 36 колоде:
	 * 6-8 - мелкие
	 * 9-валет - средние
	 * дама-туз - крупные
	 * При 24 колоде:
	 * 9-10 - мелкие
	 * валет-дама - средние
	 * король-туз - крупные
	 */
	cardClassification: (card: CardType, cardsCount: CardsCountType) => CardClass;
}

const POWER_CLASS_BOUNDARIES: Record<CardsCountType, { small: number; medium: number }> = {
	24: { small: 4, medium: 6 },
	36: { small: 5, medium: 8 },
	52: { small: 6, medium: 10 },
};

type CardClass = 'small' | 'medium' | 'large';

const CardClassification: ICardClassification = {

	cardClassification: (card, cardsCount) => {
		const { small, medium } = POWER_CLASS_BOUNDARIES[cardsCount];

		if (card.power <= small) return 'small';
		if (card.power <= medium) return 'medium';
		return 'large';
	},

}

export default CardClassification;