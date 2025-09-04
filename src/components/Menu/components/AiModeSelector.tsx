import type { AiModeType } from '@/types/GameTypes.ts';
import { aiModeLocal } from '@/data/localization.ts';
import Selector from '@/components/Menu/components/Selector.tsx';

type AiModeSelectorProps = {
	updateSettings: (newSettings: { aiMode: string }) => void,
	isGameOn: boolean
}

const AiModeSelector = ({ updateSettings, isGameOn }: AiModeSelectorProps) => {
	return (
		<Selector<AiModeType>
			isDisabled={isGameOn}
			options={['easy', 'medium', 'hard', 'extreme']}
			initValue={'medium'}
			formatValue={(value) => aiModeLocal[value]}
			onChange={(value) => updateSettings({ aiMode: value })}
			label={'Сложность ИИ'}
		/>
	);
};

export default AiModeSelector;