import { Move } from '@/types/store/MoveHistoryType.ts';
import { CardId } from '@/types/GameTypes.ts';

type CardKnowledge = {
	raisedCards: CardId[],
	attackedCards: CardId[],
	defendedCards: CardId[],
	knownCards: CardId[],
}

type IPlayerModelService = {
	buildCardKnowledge: (history: Move[], window: number) => CardKnowledge;
}

const PlayerModelService: IPlayerModelService = {
	/**
	 * Общие знания о картах игрока на основе журнала ходов
	 */
	buildCardKnowledge: (history, window = 3) => {
		// Карты в руке игрока
		const knownCards = new Set<CardId>();

		// Актуальные данные за последние window ходов
		const recentRaisedCards = new Set<CardId>();
		const recentAttackedCards = new Set<CardId>();
		const recentDefendedCards = new Set<CardId>();

		// Последний актуальный ход с конца
		let lastMove = history.length - window;

		for (let i = 0; i < history.length; i++) {
			const move = history[i];

			if (move.player !== 'human') continue;

			switch (move.action) {
				case 'raise': {
					move.cardIds.forEach((c) => {
						if(i >= lastMove) recentRaisedCards.add(c);
						knownCards.add(c);
					});
					break;
				}
				case 'attack': {
					move.cardIds.forEach((c) => {
						if(i >= lastMove) recentAttackedCards.add(c);
						knownCards.delete(c);
					});
					break;
				}
				case 'defend': {
					move.cardIds.forEach((c) => {
						if(i >= lastMove) recentDefendedCards.add(c);
						knownCards.delete(c);
					});
					break;
				}
			}
		}

		return {
			raisedCards: [...recentRaisedCards],
			attackedCards: [...recentAttackedCards],
			defendedCards: [...recentDefendedCards],
			knownCards: [...knownCards],
		};
	},

};

export default PlayerModelService;