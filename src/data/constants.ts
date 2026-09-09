import type { Players } from '@/types/GameTypes.ts';

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
