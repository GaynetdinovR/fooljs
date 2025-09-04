import styles from '@/styles/modules/Ui.module.sass';
import classNames from 'classnames';

interface CardProps {
	frontImage?: string | null;
	isClickable?: boolean;
	onClick?: () => void;
	className?: string;
}

const Card = ({
				  frontImage = '',
				  isClickable = true,
				  onClick = () => {},
				  className = '',
			  }: CardProps) => {

	const handleClick = () => {
		if (isClickable) onClick();
	};

	const isFrontImgExists: boolean = !!frontImage;

	return (
		<button
			disabled={!isClickable}
			className={classNames(styles.card, className)}
			onClick={handleClick}
		>
			<div className={styles.card__face}>
				<img
					src={isFrontImgExists ? frontImage : 'content/back.png'}
					alt={isFrontImgExists ? 'Card front' : 'Card back'}
					className={styles.card__img}
				/>
			</div>
		</button>
	);
};

export { Card };
export default Card;
