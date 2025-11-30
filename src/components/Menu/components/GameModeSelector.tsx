import type { GameModeType } from '@/types/GameTypes.ts';
import { gameModeLocal } from '@/data/localization.ts';
import Selector from '@/components/Menu/components/Selector.tsx';

type GameModeSelectorProps = {
	updateSettings: (newSettings: { gameMode: string }) => void,
	isGameOn: boolean
}

const GameModeSelector = ({ updateSettings, isGameOn }: GameModeSelectorProps) => {
	return (
		<Selector<GameModeType>
			isDisabled={isGameOn}
			options={['throw-in', 'with passing']}
			initValue={'throw-in'}
			formatValue={(value) => gameModeLocal[value]}
			onChange={(value) => updateSettings({ gameMode: value })}
			label={'Режим'}
		/>
	);
};

export default GameModeSelector;