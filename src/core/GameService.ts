class GameService {
	/**
	 * Возвращает фазу игры
	 * 1 фаза - Колода полная, бито почти пустое. В колоде больше 1/3 и в бито меньше 1/3
	 * 2 фаза - Основная середина игры. В колоде меньше 1/3, но больше 4 карт. В бито больше 1/3
	 * 3 фаза - Колода почти пустая, игра заканчивается. В колоде 0-4 карт, у игроков оставшиеся карты
	 * Особый случай: У игроков много карт, но бито еще мало (переходный период). Если у игроков много карт, в бито меньше 1/3 и в колоде меньше 1/3, то фаза 2.5
	 * Базовый случай: 2 фаза
	 * @param cardsCount
	 * @param gameCardsCount
	 */
	static getGamePhase = (cardsCount: { deck: number, human: number, bot: number, fall: number }, gameCardsCount: number): string => {
		const { deck, human, bot, fall } = cardsCount;

		const oneThird = Math.floor(gameCardsCount / 3);
		const twoThirds = Math.floor(2 * gameCardsCount / 3);

		if (deck > oneThird && fall < oneThird) return '1';

		if (deck <= oneThird && deck > 4 && fall >= oneThird) return '2';

		if ((human + bot) > twoThirds && fall < oneThird) return '2.5';

		if (deck <= 4 && fall >= oneThird) return '3';

		return '2';
	}
}

export default GameService;