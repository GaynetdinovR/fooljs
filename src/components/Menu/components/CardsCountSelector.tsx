import type { CardsCountType } from '@/types/GameTypes.ts';
import Selector from '@/components/Menu/components/Selector.tsx';

type CardsCountSelectorProps = {
	updateSettings: (newSettings: { cardsCount: number }) => void,
	isGameOn: boolean
}

const CardsCountSelector = ({ updateSettings, isGameOn }: CardsCountSelectorProps) => {
	return (
		<Selector<CardsCountType>
			isDisabled={isGameOn}
			options={[24, 36, 52, 54]}
			initValue={36}
			formatValue={(value) => value.toString()}
			onChange={(value) => updateSettings({ cardsCount: value })}
			label={'Количество карт'}
		/>
	);
};

export default CardsCountSelector;