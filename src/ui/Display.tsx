import styles from '@/styles/modules/Ui.module.sass';
import { ReactNode } from 'react';

type DisplayProps = {
	children: ReactNode
}

const Display = ({children}: DisplayProps) => {
	return (
        <div className={styles.display}>
            {children}
        </div>
	);
};

export default Display;