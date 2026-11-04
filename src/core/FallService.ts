import type { Card as CardType, Suits } from '@/types/GameTypes.ts';

type IFallService = {
	/**
	 * Возвращает козыри, ушедшие в бито
	 */
	getFallTrumps: (fall: CardType[], trumpSuit: Suits) => CardType[];
	getFallCardsBySuit: (fall: CardType[], suit: Suits) => CardType[];
}

const FallService: IFallService = {
	getFallTrumps: (fall, trumpSuit) => {
		if(fall.length === 0) return [];
		return fall.filter((card) => card.suit === trumpSuit);
	},

	getFallCardsBySuit: (fall, suit) => {
		return fall.filter((card) => card.suit === suit);
	}
};

export default FallService;
