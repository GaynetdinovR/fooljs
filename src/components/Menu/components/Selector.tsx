import styles from '@/styles/modules/Menu.module.sass';
import SettingCarousel from '@/ui/SettingCarousel.tsx';
import { useState } from 'react';

type SelectorProps<T> = {
	onChange: (value: T) => void,
	isDisabled: boolean,
	options: T[],
	initValue: T,
	formatValue: (value: T) => string,
	label: string
}

const Selector = <T,>({ onChange, isDisabled, options, initValue, formatValue, label }: SelectorProps<T>) => {
	const [value, setValue] = useState<T>(initValue);

	const handleChange = (newValue: T) => {
		setValue(newValue);
	    onChange(newValue);
	};

	return (
		<>
			<span className={styles.menu__game_data_name}> {label}  </span>
			<SettingCarousel<T>
				className={styles.menu__game_data_carousel_item}
				options={options}
				onChange={handleChange}
				disabled={isDisabled}
				value={value}
				formatValue={formatValue}
			/>
		</>
	);
};

export default Selector;