import CardDatabase from '@/core/CardDatabase.ts';

import type {
	BotGameData,
	Card as CardType,
	CardId,
	CardsCountType,
	MoveWithCardObject,
} from '@/types/GameTypes.ts';
import type { Move } from '@/types/store/MoveHistoryType.ts';
import type { TableCardPair } from '@/types/store/TableStoreType.ts';
import type { TableCardObjectsPair } from '@/types/core/ITableService.ts';

type Params = {
	hand: CardId[];
	table: TableCardPair[];
	trumpCard: CardId;
	fall: CardId[];
	deck: CardId[];
	cardsCount: CardsCountType;
	history: Move[];
	opponentHandCount: number;
};

type IGameDataResolver = {
	resolveTablePairs: (table: TableCardPair[]) => TableCardObjectsPair[];
	resolveMoveHistory: (history: Move[]) => MoveWithCardObject[];
	resolveBotGameData: (params: Params) => BotGameData;
	resetCache: () => void;
};

let cachedFall: CardType[] = [];

let cachedHistory: MoveWithCardObject[] = [];

let cachedTrumpCard: CardType | undefined = undefined;

const GameDataResolver: IGameDataResolver = {
	resolveTablePairs: (table) => {
		return table.map(([attackId, defendId]) => {
			const attackCard = CardDatabase.getCardById(attackId);
			const defendCard = defendId ? CardDatabase.getCardById(defendId) : undefined;

			return [attackCard, defendCard];
		});
	},

	resolveMoveHistory: (moveHistory) => {
		const moveHistoryObjects: MoveWithCardObject[] = [];

		for (const move of moveHistory) {
			const cards = CardDatabase.getCardsById(move.cardIds);

			const base = {
				moveNumber: move.moveNumber,
				player: move.player,
				action: move.action,
				cards: cards,
			};

			if (move.action === 'defend' && move.attackCardId) {
				const attackCard = CardDatabase.getCardById(move.attackCardId);
				moveHistoryObjects.push({ ...base, attackCard });
				continue;
			}

			moveHistoryObjects.push(base);
		}

		return moveHistoryObjects;
	},

	resetCache: () => {
		cachedHistory = [];
		cachedFall = [];
		cachedTrumpCard = undefined;
	},

	resolveBotGameData: ({
							 hand,
							 table,
							 trumpCard,
							 fall,
							 deck,
							 cardsCount,
							 history,
							 opponentHandCount,
						 }) => {
		if (fall.length < cachedFall.length) {
			cachedFall = CardDatabase.getCardsById(fall);
		} else if (fall.length > cachedFall.length) {
			for (let i = cachedFall.length; i < fall.length; i++) {
				cachedFall.push(CardDatabase.getCardById(fall[i]));
			}
		}

		if (history.length < cachedHistory.length) {
			cachedHistory = GameDataResolver.resolveMoveHistory(history);
		} else if (history.length > cachedHistory.length) {
			const newMoves = history.slice(cachedHistory.length);
			const resolvedNew = GameDataResolver.resolveMoveHistory(newMoves);
			for (const m of resolvedNew) {
				cachedHistory.push(m);
			}
		}

		if(!cachedTrumpCard || trumpCard !== cachedTrumpCard.id){
			cachedTrumpCard = CardDatabase.getCardById(trumpCard);
		}

		return {
			hand: CardDatabase.getCardsById(hand),
			table: GameDataResolver.resolveTablePairs(table),
			trumpCard: cachedTrumpCard,
			fall: cachedFall,
			deckLength: deck.length,
			cardsCount: cardsCount,
			history: cachedHistory,
			opponentHandCount: opponentHandCount,
		};
	},
};

export default GameDataResolver;