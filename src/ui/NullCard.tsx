import styles from '@/styles/modules/Ui.module.sass';

type NullCardProps = {
	frontImage?: string | null;
}

const NullCard = ({ frontImage = null }: NullCardProps) => {
	const isFrontImgExists: boolean = !!frontImage;

	return (
		<div className={styles.null_card}>
			<img
				src={isFrontImgExists ? frontImage : 'content/back.png'}
				alt={isFrontImgExists ? 'Card front' : 'Card back'}
				className={styles.null_card__img}
			/>
		</div>
	);
};

export default NullCard;