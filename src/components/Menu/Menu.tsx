import Logo from '@/ui/Logo.tsx';
import styles from '@/styles/modules/Menu.module.sass';
import ToggleMenuButton from '@/components/Menu/components/ToggleMenuButton.tsx';
import { motion } from 'framer-motion';
import GameData from '@/components/Menu/components/GameData.tsx';
import ResetGameButton from '@/components/Menu/components/ResetGameButton.tsx';
import AnimatedSide from '@/components/Menu/components/AnimatedSide.tsx';
import { useSettings, useStatus } from '@/stores/gameStore.ts';
import { gameModeLocal } from '@/data/localization.ts';
import StartButton from '@/components/Menu/components/StartButton.tsx';
import { useMenuLogic } from '@/hooks/useMenuLogic.ts';
import Stats from '@/components/Menu/components/Stats.tsx';
import VerticalDivider from '@/components/Menu/components/VerticalDivider.tsx';
import { useEffect } from 'react';

// TODO: Довести до вида
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

const Menu = () => {
	const status = useStatus();
	const settings = useSettings();

	const {
		isMenuOpen,
		isAnimationEnded,
		handleStartBtn,
		handleResetBtn,
		toggleMenu,
		openStartMenu
	} = useMenuLogic();

	useEffect(() => {
		if(status === 'game-over') {
			openStartMenu();
		}
	}, [status]);

	const windowWidth = window.innerWidth;

	// true если игра идет, false если открыто какое-либо окно
	const isGameOn = !['in-menu', 'game-over'].includes(status);
	const openMenuWidth = isGameOn ? 500 : windowWidth;

	const isShouldShowStartMenu = !isAnimationEnded;
	const isShouldShowGameOnMenu = !isShouldShowStartMenu;
	const isShouldShowStats = status === 'game-over';

	return (
		<motion.aside
			initial={{ width: windowWidth }}
			animate={{
				width: isMenuOpen ? openMenuWidth : 150,
				transition: { duration: MENU_ANIMATION.duration.menuOpening },
			}}
			className={styles.menu}
		>
			<Logo />
			<AnimatedSide isOpen={isMenuOpen}>
				<h4 className={styles.menu__title}>Дурак: {gameModeLocal[settings.gameMode]}</h4>
				<div className={styles.menu__controls}>
					<GameData isGameOn={isGameOn} />
					{isShouldShowStats && (<VerticalDivider/>)}
					{isShouldShowStats && <Stats />}
				</div>
				<> {isShouldShowGameOnMenu && (<ResetGameButton onClick={handleResetBtn} />)}
				{isShouldShowStartMenu && (<StartButton onClick={handleStartBtn} />)} </>
			</AnimatedSide>
			<>{isShouldShowGameOnMenu && (<ToggleMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />)}</>
		</motion.aside>
	);
};

export default Menu;