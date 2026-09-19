import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/modules/Menu.module.sass';

import { useMenuLogic } from '@/hooks/useMenuLogic.ts';
import { useSettings, useStatus } from '@/stores/gameStore.ts';

import { gameModeLocal } from '@/data/localization.ts';
import { MENU_ANIMATION } from '@/data/constants.ts';

import Logo from '@/ui/Logo.tsx';
import ToggleMenuButton from '@/components/Menu/components/ToggleMenuButton.tsx';
import GameData from '@/components/Menu/components/GameData.tsx';
import ResetGameButton from '@/components/Menu/components/ResetGameButton.tsx';
import AnimatedSide from '@/components/Menu/components/AnimatedSide.tsx';
import StartButton from '@/components/Menu/components/StartButton.tsx';
import Stats from '@/components/Menu/components/Stats.tsx';
import VerticalDivider from '@/components/Menu/components/VerticalDivider.tsx';

const Menu = () => {
	const status = useStatus();
	const settings = useSettings();

	const {
		isMenuOpen,
		isAnimationEnded,
		handleStartBtn,
		handleResetBtn,
		toggleMenu,
		openStartMenu,
	} = useMenuLogic();

	useEffect(() => {
		if (status === 'game-over') {
			openStartMenu();
		}
	}, [status, openStartMenu]);

	const windowWidth: number = window.innerWidth;

	/* true если игра идет, false если открыто какое-либо окно */
	const isGameOn: boolean = !['in-menu', 'game-over'].includes(status);
	const openMenuWidth: number = isGameOn ? 500 : windowWidth;

	const isShouldShowStartMenu: boolean = !isAnimationEnded;
	const isShouldShowGameOnMenu: boolean = !isShouldShowStartMenu;
	const isShouldShowStats: boolean = status === 'game-over';

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
					{isShouldShowStats && <VerticalDivider />}
					{isShouldShowStats && <Stats />}
				</div>
				<>
					{isShouldShowGameOnMenu && <ResetGameButton onClick={handleResetBtn} />}
					{isShouldShowStartMenu && <StartButton onClick={handleStartBtn} />}{' '}
				</>
			</AnimatedSide>
			<>
				{isShouldShowGameOnMenu && (
					<ToggleMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
				)}
			</>
		</motion.aside>
	);
};

export default Menu;
