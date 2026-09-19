import { useState } from 'react';
import { MENU_ANIMATION } from '@/data/constants.ts';
import { delay, formatToMs } from '@/utils/utils.ts';
import useGameStore from '@/stores/gameStore.ts';
import useClearAll from '@/utils/hooks/useClearAll.ts';

interface MenuLogicType {
	isMenuOpen: boolean;
	isAnimationEnded: boolean;
	/**
	 * Закрывает меню, обновляет статус
	 */
	handleStartBtn: () => void;
	/**
	 * Закрывает полуоткрытое меню, обновляет статус, открывает полное меню, сбрасывает все данные игры
	 */
	handleResetBtn: () => void;
	toggleMenu: () => void;
	openStartMenu: () => void;
}

/**
 * Отвечает за логику меню(синхронизирует анимации с действиями)
 */
export const useMenuLogic = (): MenuLogicType => {
	const { updateStatus } = useGameStore();
	const { clearAll } = useClearAll();

	const [isMenuOpen, setMenu] = useState<boolean>(true);
	const [isAnimationEnded, setAnimationEnded] = useState<boolean>(false);

	const openStartMenu = () => {
		setMenu(true);
		setAnimationEnded(false);
	};

	const handleStartBtn = async () => {
		setMenu(false);
		updateStatus('game-on');

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening));

		setAnimationEnded(true);
	};

	const handleResetBtn = async () => {
		setMenu(false);
		updateStatus('in-menu');

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening) / 2);

		setAnimationEnded(false);

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening) / 2);

		setMenu(true);

		await delay(formatToMs(MENU_ANIMATION.duration.menuOpening));

		clearAll();
	};

	const toggleMenu = () => setMenu(!isMenuOpen);

	return {
		isMenuOpen,
		isAnimationEnded,
		handleStartBtn,
		handleResetBtn,
		toggleMenu,
		openStartMenu,
	};
};
