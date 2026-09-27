import { create } from 'zustand/react';
import type PlayersStoreType from '@/types/store/PlayersStoreType.ts';

const INIT_STORE = {
	human: [],
	bot: [],
};

const usePlayersStore = create<PlayersStoreType>((set, get) => ({
	...INIT_STORE,
	updateHumanHand: (hand) => set({ human: hand }),
	updateBotHand: (hand) => set({ bot: hand }),
	giveCardToPlayer: (player, cardId) => {
		const currentHand = get()[player];

		set({ [player]: [...currentHand, cardId] });
	},
	giveCardsToPlayer: (player, cardsId) => {
		const currentHand = get()[player];

		set({ [player]: [...currentHand, ...cardsId] });
	},
	removeCardFromPlayer: (player, cardId) => {
		const currentHand = get()[player];

		const arrayFiltered = currentHand.filter((handCardId) => handCardId !== cardId);

		set({ [player]: arrayFiltered });
	},
	clearAll: () => set(() => ({ ...INIT_STORE })),
}));

export const useHumanHand = () => usePlayersStore((state) => state.human);
export const useBotHand = () => usePlayersStore((state) => state.bot);

export default usePlayersStore;
