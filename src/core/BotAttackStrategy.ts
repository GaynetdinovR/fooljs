import type {
	BotGameData,
	Card as CardType,
	GamePhase,
	Suits,
} from '@/types/GameTypes.ts';
import GameService from '@/core/GameService.ts';
import PlayerModelService from '@/core/PlayerModelService.ts';
import { PriorityGroup, RISKY_PRIORITY, SAFE_PRIORITY, UNSAFE_PRIORITY } from '@/data/priorities.ts';
import CardService from '@/core/CardService.ts';
import BotStrategyService, { DefenseStrength } from '@/core/BotStrategyService.ts';

export const DEPTH_TO_ATTACK = 14;

type IBotAttackStrategy = {
	chooseCardToAttackByPriority: (
		possibleMoves: CardType[],
		gameData: BotGameData,
	) => CardType | undefined;
	canOpponentDefendNonTrump: (attackCard: CardType, trumpSuit: Suits, knownCards: CardType[]) => boolean;
	resolvePriority: (
		gamePhase: GamePhase,
		defenseStrength: DefenseStrength,
	) => PriorityGroup[];
	pickCardFromGroup: (
		candidates: CardType[],
		group: PriorityGroup,
		gamePhase: GamePhase,
		defenseStrength: DefenseStrength,
		gameData: BotGameData,
		trumpSuit: Suits,
	) => CardType;
}

const BotAttackStrategy: IBotAttackStrategy = {
	canOpponentDefendNonTrump: (attackCard, trumpSuit, knownCards) => {
		return knownCards.some(c =>
			c.suit === attackCard.suit &&
			c.power > attackCard.power &&
			c.suit !== trumpSuit
		);
	},

	resolvePriority: (gamePhase, aggressionSafety) => {
		if (gamePhase === '1') return RISKY_PRIORITY;

		if (gamePhase === '2') {
			if (aggressionSafety === 'strong') return SAFE_PRIORITY;
			if (aggressionSafety === 'medium') return RISKY_PRIORITY;
			if (aggressionSafety === 'weak') return UNSAFE_PRIORITY;
		}

		if (gamePhase === '3') {
			if (aggressionSafety === 'strong') return SAFE_PRIORITY;
			if (aggressionSafety === 'medium') return RISKY_PRIORITY;
			if (aggressionSafety === 'weak') return UNSAFE_PRIORITY;
		}

		throw new Error(`Unhandled phase/safety: ${gamePhase}/${aggressionSafety}`);
	},

	pickCardFromGroup: (candidates, group, gamePhase, defenseStrength, gameData, trumpSuit) => {
		if (gamePhase === '3' && defenseStrength === 'strong') {
			for (const c of candidates) {
				if (BotStrategyService.isHighestCardInGame(c, gameData)) return c;
			}
		}

		return group.direction === 'highest'
			? CardService.getHighestCard(candidates, trumpSuit)
			: CardService.getLowestCard(candidates, trumpSuit);
	},

	chooseCardToAttackByPriority: (possibleMoves, gameData) => {
		const { hand, trumpCard, cardsCount, deckLength, fall, history } = gameData;

		const gamePhase = GameService.getGamePhase({ deck: deckLength, fall: fall.length }, cardsCount);
		const defenseStrength = BotStrategyService.evaluateDefenseStrength(hand, trumpCard.suit, cardsCount);

		const cardKnowledge = PlayerModelService.buildCardKnowledge(history, DEPTH_TO_ATTACK);
		const weakSuit = PlayerModelService.detectWeakSuit(cardKnowledge, trumpCard.suit);

		const priority = BotAttackStrategy.resolvePriority(gamePhase, defenseStrength);

		for (const group of priority) {

			const candidates = possibleMoves.filter((c) => group.condition(c, { ...gameData, weakSuit }));
			if (candidates.length === 0) continue;

			return BotAttackStrategy.pickCardFromGroup(
				candidates,
				group,
				gamePhase,
				defenseStrength,
				gameData,
				trumpCard.suit,
			);
		}

		return undefined;
	},
};

export default BotAttackStrategy;