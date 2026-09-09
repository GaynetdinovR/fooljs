import styles from '@/styles/modules/Menu.module.sass';
import { motion } from 'framer-motion';
import { MENU_ANIMATION } from '@/data/constants.ts';

interface ToggleMenuButtonProps {
	isOpen: boolean;
	onClick: () => void;
}

const ToggleMenuButton = ({ isOpen, onClick }: ToggleMenuButtonProps) => {
	return (
		<motion.button
			animate={{
				rotate: isOpen ? 0 : 180,
				transition: { duration: MENU_ANIMATION.duration.menuBtnRotate },
			}}
			onClick={onClick}
			className={styles.menu__arrow_btn}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
		>
			<div className={styles.menu__arrow_btn_arrow} />
		</motion.button>
	);
};

export default ToggleMenuButton;
