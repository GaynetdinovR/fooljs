import { create } from 'zustand/react';
import type { Card } from '@/types/GameTypes.ts';
import type DeckStoreType from '@/types/store/DeckStoreType.ts';

const INIT_STORE = {
	deck: [],
	trumpCard: null,
};

const useDeckStore = create<DeckStoreType>((set, get) => ({
	...INIT_STORE,
	updateDeck: (deck: Card[]) => set(() => ({ deck: deck })),
	dealCard: () => {
		const currentDeck = get().deck;
		if(!currentDeck) return;

		const takenCard = currentDeck[0];
		set({ deck: currentDeck.slice(1) });
		return takenCard;
	},
	updateTrumpCard: (trumpCard: Card) => set(() => ({ trumpCard: trumpCard })),
	clearAll: () => set(() => (INIT_STORE)),
}));

export const useDeck = () => useDeckStore(state => state.deck);
export const useTrumpCard = () => useDeckStore(state => state.trumpCard);

export default useDeckStore;