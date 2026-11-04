import type { CardsCountType, Card as CardType, Suits } from '@/types/GameTypes.ts';
import { TableCardObjectsPair } from '@/types/core/ITableService.ts';
import TableService from '@/core/TableService.ts';

export type CardClass = 'small' | 'medium' | 'large';
export type HandClassification = {
	trump: {
		large: number,
		medium: number,
		small: number
	},
	large: number,
	medium: number,
	small: number
}

type ICardClassificationService = {
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

	groupHandClassification: (hand: CardType[], trumpSuit: Suits, cardsCount: CardsCountType) => HandClassification;

	/**
	 * Числовая оценка набора карт как ресурса.
	 * Чем выше — тем «лучше» набор.
	 */
	gradeHand: (
		cards: CardType[],
		trumpSuit: Suits,
		cardsCount: CardsCountType,
	) => number;

	/**
	 * Числовая оценка ОДНОЙ карты относительно текущей руки.
	 * Не учитывает стол — только «насколько эта карта ценна как часть руки».
	 *
	 * Выше = ценнее держать. Ниже/отрицательно = кандидат на сброс.
	 */
	gradeCardInHand: (
		card: CardType,
		hand: CardType[],
		trumpSuit: Suits,
		cardsCount: CardsCountType,
	) => number;
	/**
	 * Оценка ВЗЯТИЯ стола: дельта качества руки при добавлении карт стола.
	 * > 0 — брать выгодно, < 0 — невыгодно.
	 */
	gradeTakingTable: (
		hand: CardType[],
		table: TableCardObjectsPair[],
		trumpSuit: Suits,
		cardsCount: CardsCountType,
	) => number;

	gradeDefendCost: (defendCards: CardType[], hand: CardType[], trumpSuit: Suits, cardsCount: CardsCountType) => number;
}

const POWER_CLASS_BOUNDARIES: Record<CardsCountType, { small: number; medium: number }> = {
	24: { small: 3, medium: 5 },
	36: { small: 4, medium: 7 },
	52: { small: 6, medium: 10 },
};


const CardClassificationService: ICardClassificationService = {

	cardClassification: (card, cardsCount) => {
		const { small, medium } = POWER_CLASS_BOUNDARIES[cardsCount];

		if (card.power <= small) return 'small';
		if (card.power <= medium) return 'medium';
		return 'large';
	},

	gradeCardInHand: (card, hand, trumpSuit, cardsCount) => {
		const cardClass = CardClassificationService.cardClassification(card, cardsCount);
		const isTrump = card.suit === trumpSuit;

		let score = 0;

		if (cardClass === 'large') score += 1;
		if (cardClass === 'medium') score += 0;
		if (cardClass === 'small') score -= 1;

		if (isTrump) score += 2;

		const samePower = hand.filter((handCard) => handCard.power === card.power).length;
		if (samePower > 1) score += samePower - 1;

		const sameSuit = hand.filter((handCard) => handCard.suit === card.suit).length;
		if (!isTrump && sameSuit > 3) score -= 1;

		return score;
	},

	gradeHand: (cards, trumpSuit, cardsCount) => {
		if (cards.length === 0) return 0;

		const powerCount = new Map<number, number>();
		const suitCount = new Map<Suits, number>();

		for (const card of cards) {
			powerCount.set(card.power, (powerCount.get(card.power) ?? 0) + 1);
			suitCount.set(card.suit, (suitCount.get(card.suit) ?? 0) + 1);
		}

		let score = 0;

		for (const card of cards) {
			const cardClass = CardClassificationService.cardClassification(card, cardsCount);
			const isTrump = card.suit === trumpSuit;

			if (cardClass === 'large') score += 1;
			if (cardClass === 'medium') score += 0;
			if (cardClass === 'small') score -= 1;

			if (isTrump) score += 2;

			const samePower = powerCount.get(card.power) ?? 1;
			if (samePower > 1) score += (samePower - 1) / samePower;

			const sameSuit = suitCount.get(card.suit) ?? 1;
			if (!isTrump && sameSuit > 3) score -= 1 / sameSuit;
		}

		return score;
	},

	gradeTakingTable: (hand, table, trumpSuit, cardsCount) => {
		if (table.length === 0) return 0;

		const tableCards: CardType[] = TableService.getAllTableCards(table);

		const handScore = CardClassificationService.gradeHand(hand, trumpSuit, cardsCount);
		const afterScore = CardClassificationService.gradeHand(
			[...hand, ...tableCards],
			trumpSuit,
			cardsCount,
		);

		return afterScore - handScore;
	},

	/**
	 * Насколько "дорого" потратить набор карт для отбоя.
	 * Чем выше — тем хуже для руки (тем сильнее хочется взять вместо отбоя).
	 * Симметрична gradeTakingTable, но со знаком минус:
	 *   cost = gradeHand(hand) - gradeHand(hand без defendCards)
	 */
	gradeDefendCost: (defendCards, hand, trumpSuit, cardsCount) => {
		const before = CardClassificationService.gradeHand(hand, trumpSuit, cardsCount);
		const remaining = hand.filter(c => !defendCards.some(d => d.id === c.id));
		const after = CardClassificationService.gradeHand(remaining, trumpSuit, cardsCount);
		return before - after;
	},

	groupHandClassification: (hand, trumpSuit, cardsCount) => {
		const handClassification = {
			trump: {
				large: 0,
				medium: 0,
				small: 0,
			},
			large: 0,
			medium: 0,
			small: 0,
		};

		for (const card of hand) {
			const cardClass = CardClassificationService.cardClassification(card, cardsCount);

			if (card.suit === trumpSuit) {
				handClassification.trump[cardClass] += 1;
				continue;
			}

			handClassification[cardClass] += 1;
		}

		return handClassification;
	},

};

export default CardClassificationService;