import { create } from 'zustand/react';
import type PlayersStoreType from '@/types/store/PlayersStoreType.ts';
import type { Card } from '@/types/CardType.ts';

const INIT_STORE = {
	human: [],
	bot: [],
};

const usePlayersStore = create<PlayersStoreType>((set, get) => ({
	...INIT_STORE,
	updateHumanHand: (hand) => set((state) => ({ human: hand })),
	updateBotHand: (hand) => set((state) => ({ bot: hand })),
	giveCardToPlayer: (player, card) => {
		const currentHand = get()[player];

		set({[player]: [...currentHand, ...[card]]});
	},
	giveCardsToPlayer: (player, cards) => {
		const currentHand = get()[player];

		set({[player]: [...currentHand, ...cards]});
	},
	removeCardFromPlayer: (player, card) => {
		const currentHand = get()[player];

		const arrayFiltered = currentHand.filter((handCard) => handCard.id != card.id)

		set({[player]: arrayFiltered});
	},
	clearAll: () => set(() => ({...INIT_STORE}))
}));

export const useHumanHand = () => usePlayersStore(state => state.human);
export const useBotHand = () => usePlayersStore(state => state.bot);

export default usePlayersStore;