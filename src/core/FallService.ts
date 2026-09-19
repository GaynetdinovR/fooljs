import type { Card as CardType, Suits } from '@/types/GameTypes.ts';

type IFallService = {
	/**
	 * Возвращает козыри, ушедшие в бито
	 */
	getFallTrumps: (fall: CardType[], trumpSuit: Suits) => CardType[]
}

const FallService: IFallService = {
	getFallTrumps: (fall, trumpSuit) => {
		return fall.filter((card) => card.suit === trumpSuit);
	},
};

export default FallService;
