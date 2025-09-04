import type IGameInitService from '@/types/core/IGameInitService.ts';
import DeckService from '@/core/DeckService.ts';
import useDeckStore from '@/stores/deckStore.ts';
import type { GameSettings } from '@/types/GameTypes.ts';

class GameInitService implements IGameInitService {
	public settings: GameSettings | null

	constructor(settings: GameSettings | null = null) {
		this.setSettings(settings);
	}

	public setSettings = (newSettings) => this.settings = newSettings;

	// Общий метод инициализации игры
	public initialize = () => {
		useDeckStore.getState?.().clearAll();
		this.initializeDeck();
	}

	/**
	 * Инициализирует новую колоду, перемешивает и сохраняет в store
	 */
	private initializeDeck = () => {
		const deckCore = new DeckService(this.settings.cardsCount);

		const deck = deckCore.bundleDeck();
		const shuffledDeck = deckCore.shuffleDeck(deck);

		useDeckStore.setState?.({
			deck: shuffledDeck,
			trumpCard: shuffledDeck[shuffledDeck.length - 1]
		});
	};
}

export default GameInitService;