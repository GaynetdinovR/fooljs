import type {
	BotGameData,
	Card as CardType,
	PossibleMoves,
} from '@/types/GameTypes.ts';
import CardClassificationService from '@/core/CardClassificationService.ts';
import GameService from '@/core/GameService.ts';
import PlayerModelService from '@/core/PlayerModelService.ts';
import CardService from '@/core/CardService.ts';
import { DefendCardWithId } from '@/types/core/IBotDefendService.ts';
import { TableCardObjectsPair } from '@/types/core/ITableService.ts';
// import { Random } from '@/utils/Random.ts';
import BotStrategyService from '@/core/BotStrategyService.ts';

export const TAKE_THRESHOLD_UNSAFE = 2;
export const TAKE_THRESHOLD_DEFAULT = 0;
export const DEPTH_TO_DEFEND = 14;

type IBotDefendStrategy = {
	chooseDefendCard: (
		possibleMoves: PossibleMoves,
		gameData: BotGameData,
	) => DefendCardWithId | undefined;
	/*
	chooseCardToDefendByPriority: (
		possibleMoves: PossibleMoves,
		gameData: BotGameData,
	) => DefendCardWithId | undefined;
	 */
	canOpponentAddAttackCard: (card: CardType, knownCards: CardType[]) => boolean;
	shouldTakeTable: (
		hand: CardType[],
		table: TableCardObjectsPair[],          // все карты стола (включая уже отбитые)
		possibleMoves: PossibleMoves,
		gameData: BotGameData,
	) => boolean;
}

const BotDefendStrategy: IBotDefendStrategy = {
	canOpponentAddAttackCard: (card, knownCards) => {
		return knownCards.some(c => c.power === card.power);
	},

	shouldTakeTable: (hand, table, possibleMoves, gameData) => {
		const { trumpCard, cardsCount, deckLength, fall } = gameData;

		if(gameData.cardsCount === 24) return false;

		const gamePhase = GameService.getGamePhase(
			{ deck: deckLength, fall: fall.length },
			cardsCount,
		);
		const defenseStrength = BotStrategyService.evaluateDefenseStrength(
			hand,
			trumpCard.suit,
			cardsCount
		);

		// Фаза 3 (эндшпиль) — отдельная логика, обычно не берём добровольно,
		// если только не критично. Пока оставляем «не брать», калибровать позже.
		if (gamePhase === '3') return false;

		// В unsafe защита слаба — брать чаще (тратить её на отбой опасно).
		// Порог зависит от safety — это скаляр для калибровки.
		const takeThreshold = defenseStrength === 'weak' ? TAKE_THRESHOLD_UNSAFE : TAKE_THRESHOLD_DEFAULT;

		const tableCards = table.filter(([, c2]) => c2 !== null);

		// Дельта качества руки при взятии стола.
		const takingDelta = CardClassificationService.gradeTakingTable(
			hand,
			tableCards,
			trumpCard.suit,
			cardsCount,
		);

		// Дельта качества руки при отбое (потратить защитные карты).
		// Считаем как "насколько рука станет хуже, если потратить defendCards".
		const chosenDefendCard = BotDefendStrategy.chooseDefendCard(possibleMoves, gameData);
		const defendDelta = CardClassificationService.gradeDefendCost(chosenDefendCard ? [chosenDefendCard] : [], hand, trumpCard.suit, cardsCount);

		// Брать, если взятие выгоднее отбоя с учётом порога.
		return takingDelta - defendDelta > takeThreshold;
	},

	chooseDefendCard: (possibleMoves, gameData) => {
		const { hand, trumpCard, history } = gameData;
		const cardKnowledge = PlayerModelService.buildCardKnowledge(history, DEPTH_TO_DEFEND);

		// Для каждой атакуемой карты — лучшая защита (минимальная подходящая).
		// Затем выбираем пару (атака, защита) по эвристике:
		//   - предпочитаем защиту, которую соперник НЕ сможет подкинуть (canOpponentAddAttackCard === false);
		//   - среди них — минимальную по стоимости;
		//   - если все "подкидываемые" — минимальную по стоимости.
		const candidates: { attackCardId: string; defendCard: CardType }[] = [];
		for (const [attackCardId, defendCardIds] of Object.entries(possibleMoves)) {
			const defendCards = defendCardIds.map(id => CardService.findCardById(hand, id));
			const best = CardService.getLowestCard(defendCards, trumpCard.suit);
			candidates.push({ attackCardId, defendCard: best });
		}

		// Приоритет: не подкидываемая защита
		const notAddable = candidates.filter(
			({ defendCard }) => !BotDefendStrategy.canOpponentAddAttackCard(defendCard, cardKnowledge.knownCards),
		);
		const pool = notAddable.length > 0 ? notAddable : candidates;

		// Среди pool — минимальная по стоимости (getLowestCard уже дал минимум для каждой атаки,
		// теперь выбираем минимум среди атак).
		const chosen = CardService.getLowestCard(pool.map(c => c.defendCard), trumpCard.suit);
		const match = pool.find(c => c.defendCard.id === chosen.id)!;

		return {
			...match.defendCard,
			attackCardId: match.attackCardId,
		};
	},

		/*
	chooseCardToDefendByPriority: (possibleMoves, gameData) => {
		const { hand, trumpCard, cardsCount, deckLength, fall } = gameData;

		// const cardKnowledge = PlayerModelService.buildCardKnowledge(history, cardsCount);
		const gamePhase = GameService.getGamePhase(
			{ deck: deckLength, fall: fall.length },
			cardsCount,
		);
		const defenseStrength = BotStrategyService.evaluateDefenseStrength(
			hand,
			trumpCard.suit,
			cardsCount,
			fall
		);

		// Собираем все защитные карты из possibleMoves (id → Card)
		const defendCardIds = Object.values(possibleMoves).flat();
		const defendCards = defendCardIds
			.map((id) => CardService.findCardById(hand, id));

		// Условие: средняя/хорошая защита, не конец игры
		const isMidGame = gamePhase !== '3';
		const isDefenseOkay = defenseStrength !== 'weak';

		if (isDefenseOkay && isMidGame) {
			// Все защитные карты должны быть полезны для руки
			const allDefendCardsUseful = defendCards.every(
				(card) =>
					CardClassificationService.gradeCardInHand(card, hand, trumpCard.suit, cardsCount) > 0,
			);

			// Карты стола (те, что уйдут в руку при взятии) тоже должны быть полезны
			const tableCards = gameData.table
				.flat()
				.filter((c): c is CardType => c !== null);

			const allTableCardsUseful = tableCards.every(
				(card) =>
					CardClassificationService.gradeCardInHand(card, hand, trumpCard.suit, cardsCount) > 0,
			);

			if (allDefendCardsUseful && allTableCardsUseful) {
				// Поднимаем — возвращаем undefined, наверху это значит "не отбиваемся"
				return undefined;
			}
		}

		const [chosenAttackCardId, chosenDefendCards] = Random.getArrayElem(
			Object.entries(possibleMoves),
		);

		const chosenDefendCard = CardService.getLowestCard(
			chosenDefendCards.map(cardId => CardService.findCardById(hand, cardId)),
			trumpCard.suit
		);

		// Все защитные карты (не только для одной атакуемой — см. ниже)
		// const allDefendCards = chosenDefendCards
		// 	.map(id => CardService.findCardById(hand, id));
		//
		// const sorted = [...CardService.sortCards(allDefendCards, trumpSuit)].reverse();
		//
		// let chosenDefendCard = sorted[0];
		//
		// for (const candidate of sorted) {
		// 	if (!BotStrategyService.canOpponentAddAttackCard(candidate, cardKnowledge.knownCards)) {
		// 		chosenDefendCard = candidate;
		// 		break;
		// 	}
		// }

		return {
			...chosenDefendCard,
			attackCardId: chosenAttackCardId
		}
	},
		 */
};

export default BotDefendStrategy;