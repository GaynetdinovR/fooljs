import toast from 'react-hot-toast';

import { BOT_WAITING_TIMES } from '@/data/constants.ts';

import { Random } from '@/utils/Random.ts';
import { delay, formatToMs } from '@/utils/utils.ts';
import log from '@/utils/log.ts';

import BotDefendService from '@/core/BotDefendService.ts';
import BotAttackService from '@/core/BotAttackService.ts';

import useGameLogic from '@/hooks/useGameLogic.ts';
import useGameData from '@/utils/hooks/useGameData.ts';
import useStoreActions from '@/utils/hooks/useStoreActions.ts';
import useGameConditions from '@/hooks/useGameConditions.ts';

import GameDataResolver from '@/core/GameDataResolver.ts';

type BotActions = {
	/**
	 * Метод атаки
	 */
	attack: () => Promise<void>;
	/**
	 * Метод поднятия карт
	 */
	raise: () => void;
	/**
	 * Метод защиты
	 */
	defend: () => Promise<void>;
};

const useBotActions = (): BotActions => {
	const  {
		bot: hand,
		human: humanHand,
		table,
		trumpCard,
		fall,
		deck,
		history,
		settings: { aiMode, cardsCount },
		status,
	}= useGameData();

	const { attackWithCard, defendWithCard } = useStoreActions();
	const { raiseActions, moveToFallActions, endMoveActions } = useGameLogic();
	const { isTableBeaten } = useGameConditions();

	const attack = async () => {
		await delay(formatToMs(Random.getArrayElemStrict<number>(BOT_WAITING_TIMES)));

		log.withLogger(() => {
			if(!trumpCard) throw 'Trump not exists!';

			const gameData = GameDataResolver.resolveBotGameData({
				hand,
				table,
				trumpCard,
				fall,
				deck,
				cardsCount,
				history,
				opponentHandCount: humanHand.length,
			});

			const attackCard = BotAttackService.attack(aiMode, gameData);

			if (!attackCard) {
				if (isTableBeaten(table)) return moveToFallActions();
				if (status === 'human-raising') return endMoveActions('bot');

				return;
			}

			attackWithCard(attackCard.id, 'bot');
		}, 'bot attack');
	};

	const raise = () => {
		toast(`Бот поднимает! Можете подкинуть карты`);

		raiseActions('bot');
	};

	const defend = async () => {
		await delay(formatToMs(Random.getArrayElemStrict<number>(BOT_WAITING_TIMES)));

		log.withLogger(() => {
			if(!trumpCard) throw 'Trump not exists!';

			const gameData = GameDataResolver.resolveBotGameData({
				hand,
				table,
				trumpCard,
				fall,
				deck,
				cardsCount,
				history,
				opponentHandCount: humanHand.length,
			});

			const defendCard = BotDefendService.defend(aiMode, gameData);

			if (!defendCard) return raise();

			const { attackCardId, ...card } = defendCard;

			table.forEach(([attackId, defendId]) => {
				if (!defendId && attackCardId === attackId) {
					defendWithCard(attackCardId, card.id, 'bot');
				}
			});
		}, 'bot defend');
	};

	return {
		attack,
		defend,
		raise,
	};
};

export default useBotActions;
