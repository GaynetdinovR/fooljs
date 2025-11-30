import { create } from 'zustand/react';
import type { Card } from '@/types/GameTypes.ts';
import type DeckStoreType from '@/types/store/DeckStoreType.ts';
import deck from '@/components/Deck/Deck.tsx';

const INIT_STORE = {
	deck: [],
	trumpCard: null,
};

const useDeckStore = create<DeckStoreType>((set, get) => ({
	...INIT_STORE,
	updateDeck: (deck) => set(() => ({ deck: deck })),
	takeCard: () => {
		const currentDeck = get().deck;
		if(!currentDeck) return;

		const takenCard = currentDeck[0];
		set({ deck: currentDeck.slice(1) });
		return takenCard;
	},
	takeCards: (count) => {
		const currentDeck = get().deck;
		if(!currentDeck || count > currentDeck.length) return;

		const takenCards = currentDeck.slice(0, count);
		set({ deck: currentDeck.slice(count) });

		return takenCards;
	},
	updateTrumpCard: (trumpCard: Card) => set(() => ({ trumpCard: trumpCard })),
	clearAll: () => set(() => (INIT_STORE)),
}));

export const useDeck = () => useDeckStore(state => state.deck);
export const useTrumpCard = () => useDeckStore(state => state.trumpCard);

export default useDeckStore;