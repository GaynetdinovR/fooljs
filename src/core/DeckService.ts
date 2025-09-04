import type IDeckService from '@/types/core/IDeckService.ts';
import data, { CARDS_PATH } from '@/data/data.ts';
import type { Card, CardsCountType } from '@/types/GameTypes.ts';

class DeckService implements IDeckService {
	private suits: string[] = data.suits;
	private values: string[];
	private isJokers: boolean = false;

	constructor(private cardCount: CardsCountType) {
		this.initialize();
	}

	// Метод инициализации
	private initialize = (): void => {
		this.setCardsDataByCount();
	};

	// Устанавливает значения карт по их общему количеству
	private setCardsDataByCount = () => {
		switch (this.cardCount) {
			case 24:
				this.values = data.values.slice(-6);
				break;
			case 36:
				this.values = data.values.slice(-9);
				break;
			case 52:
				this.values = data.values;
				break;
			case 54:
				this.values = data.values;
				this.isJokers = true;
				break;
		}
	};


	// Возвращает уникальный id карты
	private getId = (value: string, suit: string): string => {
		const valuePrefix = value === '10' ? '10' : value[0];
		const suitPrefix = suit[0];

		return valuePrefix + suitPrefix;
	};

	// Возвращает путь к изображению карты
	private getPath = (value: string, suit: string): string => {
		return `${CARDS_PATH}/${this.getId(value, suit)}.png`;
	};

	// Возвращает собранный объект карты
	private getCardInfo = (value: string, suit: string): Card => {
		const color = suit[0] == 'C' || suit[0] == 'S' ? 'black' : 'red';
		const power = this.values.indexOf(value) + 2;

		return {
			id: this.getId(value, suit),
			imgPath: this.getPath(value, suit),
			name: `${value} ${suit}`,
			color: color,
			power: power,
			suit: suit,
		};
	};

	// Создает и возвращает колоду карт
	public bundleDeck = () => {
		const deck = [];

		for (const value of this.values) {
			for (const suit of this.suits) {
				const card = this.getCardInfo(value, suit);

				deck.push(card);
			}
		}

		if (this.isJokers) return [...deck, ...data.jokers];

		return deck;
	};

	// Возвращает перемешанную колоду
	public shuffleDeck = (deck) => {
		const shuffled = [...deck];

		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		return shuffled;
	};

	// Возвращает уменьшенное количество карт, которые нужно показать в колоде
	static getSmalledCardsCountForDeck = (deck: Card[]): number => {
		const { length } = deck;

		if (length === 54) return 7;
		if (length === 1) return 0;
		if (length > 1 && length < 7) return 1;
		if (Math.floor(length / 7) === 7) return 6;

		return Math.floor(length / 7);
	};

	// Возвращает уменьшенное количество карт, которые нужно показать в бито
	static getSmalledCardsCountForFall = (cardsCount) => {
		if (cardsCount.length == 0) return 0;

		return Math.floor(cardsCount.length / 7) + 1;
	};
}

export default DeckService;