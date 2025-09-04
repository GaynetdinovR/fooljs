import styles from '@/styles/modules/Menu.module.sass';
const StartButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button className={styles.menu__start_btn} onClick={onClick}>
			Start
		</button>
	);
};

export default StartButton;