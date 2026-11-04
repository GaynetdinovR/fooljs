import type {
	BotGameData,
	Card as CardType,
	CardsCountType,
	Suits,
} from '@/types/GameTypes.ts';
import CardClassificationService from '@/core/CardClassificationService.ts';
import CardDatabase from '@/core/CardDatabase.ts';
import TableService from '@/core/TableService.ts';

export type DefenseStrength = 'strong' | 'medium' | 'weak';

type IBotStrategyService = {
	evaluateDefenseStrength: (hand: CardType[], trumpSuit: Suits, cardsCount: CardsCountType) => DefenseStrength;
	isHighestCardInGame: (card: CardType, gameData: BotGameData) => boolean;
}

export const ONLY_TRUMP_STRONG_DEFEND = 4;
export const TRUMP_STRONG_DEFEND = 3;
export const LARGE_STRONG_DEFEND = 3;

export const TRUMP_WEAK_DEFEND = 1;

export const LARGE_WEAK_DEFEND = 4;

const BotStrategyService: IBotStrategyService = {
	evaluateDefenseStrength : (hand, trumpSuit, cardsCount) => {
		const { trump, medium, large } = CardClassificationService.groupHandClassification(hand, trumpSuit, cardsCount);

		const defense = Object.values(trump).reduce((s, c) => s + c, 0);
		const defenseSupport = large + medium;

		if (defense >= TRUMP_STRONG_DEFEND && defenseSupport >= LARGE_STRONG_DEFEND) return 'strong';
		if (defense >= ONLY_TRUMP_STRONG_DEFEND) return 'strong';

		if (defense <= TRUMP_WEAK_DEFEND && defenseSupport <= LARGE_WEAK_DEFEND) return 'weak';

		return 'medium';
	},

	isHighestCardInGame: (card, gameData) => {
		if (card.suit === gameData.trumpCard.suit) return false;

		const higherCards = Array.from(
			CardDatabase
				.getCardsDatabase(gameData.cardsCount)
				.values(),
		).filter(c =>
			c.suit === card.suit &&
			c.power > card.power,
		);


		const goneCards: CardType[] = [...gameData.fall, ...TableService.getAllTableCards(gameData.table)];

		if (higherCards.length === 0) return true;

		return higherCards.every(higher =>
			goneCards.some(goneCard => goneCard.id === higher.id),
		);
	},
};

export default BotStrategyService;