import { motion } from "framer-motion";
import type { ReactNode } from 'react';
import styles from '@/styles/modules/Menu.module.sass';
import { MENU_ANIMATION } from '@/components/Menu/Menu.tsx';

interface AnimatedSideProps {
	isOpen: boolean,
	children?: ReactNode,
}

const AnimatedSide = ({isOpen, children} : AnimatedSideProps) => {
    const options = {
        initial: { x: 0 },
        animate: {
            x: isOpen ? 0 : MENU_ANIMATION.width.open,
            display: isOpen ? 'flex' : 'none',
            transition: { duration: MENU_ANIMATION.duration.menuOpening }
        },
		className: styles.animated_wrap
    }

	return (
        <motion.div {...options}>
			{children}
		</motion.div>
	);
};

export default AnimatedSide;