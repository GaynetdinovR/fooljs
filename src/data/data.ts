import type { CardsCountType } from '@/types/GameTypes.ts';

export const CARDS_PATH: string = 'content';

const data = {
	suits: ['Club', 'Diamond', 'Heart', 'Spade'],
	values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'],
};

export const CARDS_COUNT_VALUES: Record<CardsCountType, string[]> = {
	24: data.values.slice(-6),
	36: data.values.slice(-9),
	52: data.values
}
export default data;
