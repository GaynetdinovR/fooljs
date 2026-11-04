import type { BotGameData, Card as CardType, Suits } from '@/types/GameTypes.ts';
import CardClassificationService from '@/core/CardClassificationService.ts';

type PrioritiesGameData = BotGameData & { weakSuit: Suits | undefined };

export type PriorityGroup = {
	condition: (card: CardType, gameData: PrioritiesGameData) => boolean;
	direction: 'highest' | 'lowest';
};

const isWeak = (card: CardType, gameData: PrioritiesGameData) => gameData.weakSuit === card.suit;
const isTrump = (card: CardType, gameData: PrioritiesGameData) => card.suit === gameData.trumpCard.suit;
const isSmall = (card: CardType, gameData: PrioritiesGameData) =>
	CardClassificationService.cardClassification(card, gameData.cardsCount) === 'small';
const isMedium = (card: CardType, gameData: PrioritiesGameData) =>
	CardClassificationService.cardClassification(card, gameData.cardsCount) === 'medium';
const isLarge = (card: CardType, gameData: PrioritiesGameData) =>
	CardClassificationService.cardClassification(card, gameData.cardsCount) === 'large';
const isRepeat = (card: CardType, gameData: PrioritiesGameData) =>
	gameData.hand.filter(handCard => {
		return handCard.power === card.power
	}).length > 1;

// non-trump
const isMediumNonTrump = (c, g) => isMedium(c, g) && !isTrump(c, g);
const isSmallNonTrump = (c, g) => isSmall(c, g) && !isTrump(c, g);
const isLargeNonTrump = (c, g) => isLarge(c, g) && !isTrump(c, g);

// weak
const isWeakMedium = (c, g) => isWeak(c, g) && isMediumNonTrump(c, g);
const isWeakSmall = (c, g) => isWeak(c, g) && isSmallNonTrump(c, g);
const isWeakLarge = (c, g) => isWeak(c, g) && isLargeNonTrump(c, g);

// repeat
const isRepeatMedium = (c, g) => isRepeat(c, g) && isMediumNonTrump(c, g);
const isRepeatSmall = (c, g) => isRepeat(c, g) && isSmallNonTrump(c, g);
const isRepeatLarge = (c, g) => isRepeat(c, g) && isLargeNonTrump(c, g);

// weak+repeat
const isWeakRepeatMedium = (c, g) => isWeak(c, g) && isRepeat(c, g) && isMediumNonTrump(c, g);
const isWeakRepeatSmall = (c, g) => isWeak(c, g) && isRepeat(c, g) && isSmallNonTrump(c, g);
const isWeakRepeatLarge = (c, g) => isWeak(c, g) && isRepeat(c, g) && isLargeNonTrump(c, g);

export const SAFE_PRIORITY: PriorityGroup[] = [
	// medium: weak+repeat -> repeat -> weak -> single

	{ condition: isWeakSmall, direction: 'lowest' },
	{ condition: isWeakMedium, direction: 'lowest' },
	{ condition: isWeakLarge, direction: 'lowest' },

	{ condition: isSmallNonTrump, direction: 'lowest' },
	{ condition: isMediumNonTrump, direction: 'lowest' },
	{ condition: isLargeNonTrump, direction: 'lowest' },

	{ condition: isWeakRepeatSmall, direction: 'lowest' },
	{ condition: isWeakRepeatMedium, direction: 'lowest' },
	{ condition: isWeakRepeatLarge, direction: 'lowest' },

	{ condition: isRepeatSmall, direction: 'lowest' },
	{ condition: isRepeatMedium, direction: 'lowest' },
	{ condition: isRepeatLarge, direction: 'lowest' },
	// small: weak+repeat -> repeat -> weak -> single
	// large: weak+repeat -> repeat -> weak -> single
	// trump
	{ condition: (c, g) => isTrump(c, g), direction: 'lowest' },
];

export const RISKY_PRIORITY: PriorityGroup[] = [
	// small: weak+repeat -> repeat -> weak -> single
	{ condition: isWeakSmall, direction: 'lowest' },
	{ condition: isSmallNonTrump, direction: 'lowest' },
	{ condition: isWeakRepeatSmall, direction: 'lowest' },
	{ condition: isRepeatSmall, direction: 'lowest' },
	// medium: weak+repeat -> repeat -> weak -> single
	{ condition: isWeakMedium, direction: 'lowest' },
	{ condition: isMediumNonTrump, direction: 'lowest' },
	{ condition: isWeakRepeatMedium, direction: 'lowest' },
	{ condition: isRepeatMedium, direction: 'lowest' },

	// large: weak+repeat -> repeat -> weak -> single
	{ condition: isWeakLarge, direction: 'lowest' },
	{ condition: isLargeNonTrump, direction: 'lowest' },
	{ condition: isWeakRepeatLarge, direction: 'lowest' },
	{ condition: isRepeatLarge, direction: 'lowest' },
	// trump
	{ condition: (c, g) => isTrump(c, g), direction: 'lowest' },
];

export const UNSAFE_PRIORITY: PriorityGroup[] = [
	// small: repeat -> single
	{ condition: isRepeatSmall, direction: 'lowest' },
	{ condition: isSmallNonTrump, direction: 'lowest' },
	// medium: repeat -> single
	{ condition: isRepeatMedium, direction: 'lowest' },
	{ condition: isMediumNonTrump, direction: 'lowest' },
	// large: repeat -> single
	{ condition: isRepeatLarge, direction: 'lowest' },
	{ condition: isLargeNonTrump, direction: 'lowest' },
	// trump
	{ condition: (c, g) => isTrump(c, g), direction: 'lowest' },
];