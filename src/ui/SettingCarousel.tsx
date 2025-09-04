import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from '@/styles/modules/Ui.module.sass';

type SettingCarouselProps<T> = {
	className: string,
	options: T[],
	value: T,
	disabled: boolean,
	onChange: (value: T) => void,
	formatValue?: (value: T) => string;
}

const SettingCarousel = <T, >({
								  className,
								  options,
								  value,
								  disabled,
								  onChange,
								  formatValue = (value) => value,
							  }: SettingCarouselProps<T>) => {
	const [direction, setDirection] = useState<'left' | 'right'>('');

	const handleChange = (newDirection: 'left' | 'right'): void => {
		setDirection(newDirection);
		const currentIndex = options.indexOf(value);
		let newIndex;

		if (newDirection === 'right') {
			newIndex = (currentIndex + 1) % options.length;
		} else {
			newIndex = (currentIndex - 1 + options.length) % options.length;
		}

		onChange(options[newIndex]);
	};

	return (
		<div className={styles.setting_carousel}>
			<button disabled={disabled} onClick={() => handleChange('left')} className={styles.setting_carousel__btn}>
				&lt;
			</button>

			<div className={styles.setting_carousel__content}>
				<AnimatePresence mode="popLayout" custom={direction}>
					<motion.div
						className={classNames(styles.setting_carousel__value, className)}
						key={value}
						custom={direction}
						initial={{
							opacity: 0,
							x: direction === 'right' ? 70 : -70,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						exit={{
							opacity: 0,
							x: direction === 'right' ? -70 : 70,
						}}
						transition={{
							type: 'spring',
							stiffness: 400,
							damping: 40,
						}}
					>
						{formatValue(value)}
					</motion.div>
				</AnimatePresence>
			</div>

			<button disabled={disabled} onClick={() => handleChange('right')} className={styles.setting_carousel__btn}>
				&gt;
			</button>
		</div>
	);
};

export default SettingCarousel;