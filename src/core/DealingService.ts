import { RULES } from '@/data/rules.ts';
import type { CardId } from '@/types/GameTypes.ts';

type DealCounts = [number, number];

type IDealingService = {
	/**
	 * Возвращает true, если колоды не хватает на обоих и нужно раздать поровну
	 */
	shouldDealEvenly: (handA: CardId[], handB: CardId[], deckLength: number) => boolean;

	/**
	 * Возвращает, сколько карт раздать каждому [toA, toB]
	 * Может вернуть [0, 0], если раздавать нечего
	 */
	getDealCounts: (handA: CardId[], handB: CardId[], deckLength: number) => DealCounts;

	/**
	 * Возвращает, сколько раздать поровну [toA, toB]
	 * При нечётном количестве — тот, у кого меньше карт, получает больше
	 */
	getEvenDealCounts: (handA: CardId[], handB: CardId[], deckLength: number) => DealCounts;
};

const DealingService: IDealingService = {
	shouldDealEvenly: (handA, handB, deckLength) => {
		const dealToA = Math.max(0, RULES.fool.cardsPerPlayer - handA.length);
		const dealToB = Math.max(0, RULES.fool.cardsPerPlayer - handB.length);

		if (dealToA === 0 && deckLength < dealToB) return false;
		if (dealToB === 0 && deckLength < dealToA) return false;

		return dealToA !== 0 && dealToB !== 0 && deckLength < dealToA + dealToB;
	},

	getDealCounts: (handA, handB, deckLength) => {
		let dealToA = Math.max(0, RULES.fool.cardsPerPlayer - handA.length);
		let dealToB = Math.max(0, RULES.fool.cardsPerPlayer - handB.length);

		if (dealToA === 0 && deckLength < dealToB) dealToB = deckLength;
		if (dealToB === 0 && deckLength < dealToA) dealToA = deckLength;

		return [dealToA, dealToB];
	},

	getEvenDealCounts: (handA, handB, deckLength) => {
		if (deckLength % 2 === 0) {
			return [deckLength / 2, deckLength / 2];
		}

		const more = Math.ceil(deckLength / 2);
		const less = Math.floor(deckLength / 2);

		if (handA.length > handB.length) return [more, less];
		return [less, more];
	},
};

export default DealingService;