import styles from '@/styles/modules/Menu.module.sass';

const ResetGameButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button onClick={onClick} className={styles.menu__reset_btn}>
			<img src="/icons/reset.png" alt="reset" />
		</button>
	);
};

export default ResetGameButton;