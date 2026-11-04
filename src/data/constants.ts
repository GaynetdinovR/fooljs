import type { Players } from '@/types/GameTypes.ts';
import { CardsCountType } from '@/types/GameTypes.ts';

export const PLAYERS = ['human', 'bot'] as const;

export const BOT_WAITING_TIMES = [0.5, 1, 1.5] as const;

export const GAME_STATUS = {
	ATTACK: (player: Players): 'human-attack' | 'bot-attack' => `${player}-attack`,
	RAISE: (player: Players): 'human-raising' | 'bot-raising' => `${player}-raising`,
} as const;

export const MENU_ANIMATION = {
	width: {
		open: 500,
		closed: 150,
	},
	duration: {
		menuBtnRotate: 0.125,
		menuOpening: 0.5,
	},
} as const;

export const POWER_RANGE: Record<CardsCountType, { min: number; max: number }> = {
	24: { min: 9, max: 14 },
	36: { min: 6, max: 14 },
	52: { min: 2, max: 14 },
};