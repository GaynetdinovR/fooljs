import type { IDeckService } from '@/types/core/IDeckService.ts';
import data, { CARDS_PATH } from '@/data/data.ts';
import type { Card as CardType, CardsCountType } from '@/types/GameTypes.ts';

class DeckService implements IDeckService {
	suits = data.suits;
	values;
	cardCount;

	constructor(cardCount: CardsCountType) {
		this.cardCount = cardCount;
		this.initialize();
	}

	initialize = () => {
		this.setCardsDataByCount();
	};

	setCardsDataByCount = () => {
		const cardCounts: Record<CardsCountType, string[]>  = {
			24: data.values.slice(-6),
			36: data.values.slice(-9),
			52: data.values
		}

		this.values = cardCounts[this.cardCount]
	};

	getId = (value, suit) => {
		const valuePrefix = value === '10' ? '10' : value[0];
		const suitPrefix = suit[0];

		return valuePrefix + suitPrefix;
	};

	getPath = (value, suit) => {
		return `${CARDS_PATH}/${this.getId(value, suit)}.png`;
	};

	getCardInfo = (value, suit) => {
		const color = suit[0] === 'C' || suit[0] === 'S' ? 'black' : 'red';
		const power = this.values.indexOf(value) + 2;

		return <CardType>{
			id: this.getId(value, suit),
			imgPath: this.getPath(value, suit),
			name: `${value} ${suit}`,
			color: color,
			power: power,
			suit: suit,
		};
	};

	bundleDeck = () => {
		const deck: CardType[] = [];

		for (const value of this.values) {
			for (const suit of this.suits) {
				const card = this.getCardInfo(value, suit);

				deck.push(card);
			}
		}

		return deck;
	};

	shuffleDeck = (deck) => {
		const shuffled: CardType[] = [...deck];

		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		return shuffled;
	};
}

export default DeckService;
