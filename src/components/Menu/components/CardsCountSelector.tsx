import type { CardsCountType } from '@/types/GameTypes.ts';
import Selector from '@/components/Menu/components/Selector.tsx';
import type { NewSettings } from '@/types/store/GameStoreType.ts';

type CardsCountSelectorProps = {
	updateSettings: (newSettings: NewSettings) => void;
	isGameOn: boolean;
};

const CardsCountSelector = ({ updateSettings, isGameOn }: CardsCountSelectorProps) => {
	return (
		<Selector<CardsCountType>
			isDisabled={isGameOn}
			options={[24, 36, 52]}
			initValue={36}
			formatValue={(value) => value.toString()}
			onChange={(value) => updateSettings({ cardsCount: value })}
			label={'Количество карт'}
		/>
	);
};

export default CardsCountSelector;
