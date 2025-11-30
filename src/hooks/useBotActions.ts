import BotDefendService from '@/core/BotDefendService.ts';
import { BOT_WAITING_TIMES } from '@/data/constants.ts';
import { delay } from '@/utils/utils.ts';
import { formatToMs } from '../../allAnimationsStuff/utils.ts';
import log from '@/utils/log.ts';
import BotAttackService from '@/core/BotAttackService.ts';
import TableService from '@/core/TableService.ts';
import useGameLogic from '@/hooks/useGameLogic.ts';
import toast from 'react-hot-toast';
import useGameData from '@/utils/hooks/useGameData.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import Random from '@/utils/Random.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';

const useBotActions = () => {
	const {
		bot: hand, human: humanHand, trumpCard, table, settings: { aiMode }, status,
	} = useGameData();

	const { attackWithCard, defendWithCard } = useStoreActions();
	const { raiseActions, moveToFallActions, endMoveActions } = useGameLogic();
	const { isTableBeaten } = useGameConditions();

	// Метод атаки бота
	const attack = async () => {
		await delay(formatToMs(Random.getArrayElem(BOT_WAITING_TIMES)));

		log.withLogger(() => {
			const gameData = { hand, humanHandCount: humanHand.length, table, trumpSuit: trumpCard.suit };

			const attackCard = BotAttackService.attack(aiMode, gameData);

			if (!attackCard && isTableBeaten(table)) return moveToFallActions();
			if (!attackCard && status === 'human-raising') return endMoveActions('bot');
			if (!attackCard) return;

			attackWithCard(attackCard, 'bot');
		}, 'bot attack');
	};

	// Метод поднятия карт со стола
	const raise = () => {
		toast(`Бот поднимает! Можете подкинуть карты`);

		raiseActions('bot');
	};

	// Метод защиты бота
	const defend = async () => {
		await delay(formatToMs(Random.getArrayElem(BOT_WAITING_TIMES)));

		log.withLogger(() => {
			const gameData = { hand, trumpSuit: trumpCard.suit, table };

			const defendCard = BotDefendService.defend(aiMode, gameData);

			if (!defendCard) return raise();

			const { attackCardId, ...card } = defendCard;

			table.forEach((cardPair) => {
				const attackCard = cardPair[0];

				if (!attackCard.isBeaten && attackCardId === attackCard.id) {
					defendWithCard(attackCardId, card, 'bot');
				}
			});
		}, 'bot defend');
	};

	return {
		attack,
		defend,
	};
};

export default useBotActions;