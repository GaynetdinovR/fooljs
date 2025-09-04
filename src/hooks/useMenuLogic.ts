import { useState } from 'react';
import { MENU_ANIMATION } from '@/components/Menu/Menu.tsx';
import { delay, formatToMs } from '@/utils/utils.ts';
import useGameStore from '@/stores/gameStore.ts';
import useReset from '@/hooks/useReset.ts';

//TODO: Довести до ума

interface MenuLogicType {
	isMenuOpen: boolean,
	isAnimationEnded: boolean,
	handleStartBtn: () => void,
	handleResetBtn: () => void,
	toggleMenu: () => void
}

// Отвечает за логику меню(синхронизирует анимации с действиями)
export const useMenuLogic = (): MenuLogicType => {
	const { updateStatus } = useGameStore();
	const { resetAll } = useReset();

	const [isMenuOpen, setMenu] = useState<boolean>(true);
	const [isAnimationEnded, setAnimationEnded] = useState<boolean>(false);

	/**
	 * Закрывает меню, обновляет статус
	 */
	const handleStartBtn = async () => {
		setMenu(false);
		updateStatus('game-on');

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening));

		setAnimationEnded(true)
	};

	/**
	 * Закрывает полуоткрытое меню, обновляет статус, открывает полное меню, сбрасывает все данные игры
	 */
	const handleResetBtn = async () => {
		setMenu(false);
		updateStatus('in-menu');

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening) / 2);

		setAnimationEnded(false);

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening) / 2);

		setMenu(true);

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening));

		resetAll();
	};

	const toggleMenu = () => setMenu(!isMenuOpen);

	return {
		isMenuOpen,
		isAnimationEnded,
		handleStartBtn,
		handleResetBtn,
		toggleMenu,
	};
};