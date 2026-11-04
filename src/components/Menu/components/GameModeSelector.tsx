import type { GameModeType } from '@/types/GameTypes.ts';
import { gameModeLocal } from '@/data/localization.ts';
import Selector from '@/components/Menu/components/Selector.tsx';
import type { NewSettings } from '@/types/store/GameStoreType.ts';

type GameModeSelectorProps = {
	updateSettings: (newSettings: NewSettings) => void;
};

const GameModeSelector = ({ updateSettings }: GameModeSelectorProps) => {
	return (
		<Selector<GameModeType>
			isDisabled={true}
			options={['throw-in']}
			initValue={'throw-in'}
			formatValue={(value) => gameModeLocal[value]}
			onChange={(value) => updateSettings({ gameMode: value })}
			label={'Режим'}
		/>
	);
};

export default GameModeSelector;
