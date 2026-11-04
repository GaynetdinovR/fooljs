import { Card as CardType, CardsCountType, MoveWithCardObject, Suits } from '@/types/GameTypes.ts';
import CardClassificationService from '@/core/CardClassificationService.ts';
import FallService from '@/core/FallService.ts';
import { POWER_RANGE } from '@/data/constants.ts';

type CardKnowledge = {
	raisedCards: CardType[],
	attackedCards: CardType[],
	defendedCards: [CardType, CardType][],
	knownCards: CardType[],
}

type IPlayerModelService = {
	/**
	 * Общие знания о картах игрока на основе журнала ходов
	 */
	buildCardKnowledge: (history: MoveWithCardObject[], depth: number) => CardKnowledge;
	/**
	 * Простейшее нахождение слабой масти
	 */
	detectWeakSuit: (cardKnowledge: CardKnowledge, trumpSuit: Suits) => Suits | undefined;
	/**
	 * Выдвигает гипотезу о "слабых мастях" игрока
	 * Собирает счётчики сигналов слабости по мастям
	 * Сигнал взвешивается по кол-ву ушедших карт конкретной масти
	 * Коэффициент увеличивается, если:
	 * Игрок поднимает карту;
	 * Игрок отбивается крупной картой и с запасом (разница сил >= 5);
	 * Игрок отбивается козырем.
	 */
	hypothesizeWeakSuits: (
		cardKnowledge: CardKnowledge,
		trumpSuit: Suits,
		cardsCount: CardsCountType,
		fall: CardType[],
	) => Suits[];
}

let cachedKnowledge: CardKnowledge | null = null;
let cachedHistoryLength = -1;
let cachedDepth = -1;

const PlayerModelService: IPlayerModelService = {

	buildCardKnowledge: (history, depth = 4) => {
		if (
			cachedKnowledge &&
			cachedHistoryLength === history.length &&
			cachedDepth === depth
		) {
			return cachedKnowledge;
		}

		// Карты в руке игрока
		const knownCards = new Set<CardType>();

		// Актуальные данные за последние window ходов
		const recentRaisedCards = new Set<CardType>();
		const recentAttackedCards = new Set<CardType>();
		const recentDefendedCards = new Map<CardType, CardType>();

		// Последний актуальный ход с конца
		const lastMove = history.length - depth;

		for (let i = 0; i < history.length; i++) {
			const move = history[i];

			if (move.player !== 'human') continue;

			switch (move.action) {
				case 'raise': {
					move.cards.forEach((c) => {
						if (i >= lastMove) recentRaisedCards.add(c);
						knownCards.add(c);
					});
					break;
				}
				case 'attack': {
					move.cards.forEach((c) => {
						if (i >= lastMove) recentAttackedCards.add(c);
						knownCards.delete(c);
					});
					break;
				}
				case 'defend': {
					move.cards.forEach((defendCard: CardType) => {
						if (i >= lastMove && move.attackCard) recentDefendedCards.set(move.attackCard, defendCard);
						knownCards.delete(defendCard);
					});
					break;
				}
			}
		}

		const result: CardKnowledge = {
			raisedCards: [...recentRaisedCards],
			attackedCards: [...recentAttackedCards],
			defendedCards: [...recentDefendedCards.entries()],
			knownCards: [...knownCards],
		};

		cachedKnowledge = result;
		cachedHistoryLength = history.length;
		cachedDepth = depth;

		return result;
	},

	detectWeakSuit: (cardKnowledge, trumpSuit) => {
		const weakSuits: Record<Suits, number> = {
			'Heart': 0,
			'Club': 0,
			'Spade': 0,
			'Diamond': 0,
		};

		for (const [attackCard, defendCard] of cardKnowledge.defendedCards) {
			if (defendCard.suit === trumpSuit && attackCard.suit !== trumpSuit) {
				weakSuits[attackCard.suit] += 1;
			}
		}

		for (const raisedCard of cardKnowledge.raisedCards) {
			if (raisedCard.suit !== trumpSuit) {
				weakSuits[raisedCard.suit] += 1;
			}
		}

		weakSuits[trumpSuit] = 0;

		let weakest: Suits | undefined = undefined;
		let maxSignals = 0;

		for (const [suit, signals] of Object.entries(weakSuits) as [Suits, number][]) {
			if (signals > maxSignals) {
				maxSignals = signals;
				weakest = suit;
			}
		}

		return weakest;
	},

	// TODO: Сейчас функция очень сырая, сигналы одинаковые, хотя действия разные,
	// + нет усреднения по весу и отсечения совсем слабых сигналов(потому что я не знаю сколько это - слабый сигнал)
	// Требует тонкой настройки после появления симулятора партий
	// Найти идуальную глубину среза истории, разницу силы, базовый вес
	hypothesizeWeakSuits: (cardKnowledge, trumpSuit, cardsCount, fall) => {
		const weakSuits: Record<Suits, number> = {
			'Heart': 0,
			'Club': 0,
			'Spade': 0,
			'Diamond': 0,
		};

		const { min, max } = POWER_RANGE[cardsCount];
		const range = max - min;
		const threshold = Math.ceil(range / 2);

		for (const [attackCard, defendCard] of cardKnowledge.defendedCards) {
			const isDefendCardTrump = defendCard.suit === trumpSuit;

			const isDefendCardLarge = CardClassificationService.cardClassification(defendCard, cardsCount) === 'large';
			const isCardOverDefended = defendCard.power - attackCard.power >= threshold;

			if (isDefendCardTrump) weakSuits[attackCard.suit] += 1;

			if (isCardOverDefended && isDefendCardLarge) weakSuits[attackCard.suit] += 1;
		}

		for (const raisedCard of cardKnowledge.raisedCards) {
			weakSuits[raisedCard.suit] += 1;
		}

		const suitSize = cardsCount / 4;
		for (const suit of Object.keys(weakSuits) as Suits[]) {
			const goneOfSuitCount = FallService.getFallCardsBySuit(fall, suit).length;

			if (goneOfSuitCount !== 0) weakSuits[suit] *= (goneOfSuitCount / suitSize);
		}

		// Обнуление козыря - исключение из мастей
		weakSuits[trumpSuit] = 0;

		return (Object.entries(weakSuits) as [Suits, number][])
			.filter(([, value]) => value > 0)
			.sort((a, b) => b[1] - a[1])
			.map(([suit]) => suit);
	},
};

export default PlayerModelService;