import Menu from '@/components/Menu/Menu.tsx';
import Player from '@/components/Player/Player.tsx';
import Display from '@/ui/Display.tsx';
import Fall from '@/components/Fall/Fall.tsx';
import Deck from '@/components/Deck/Deck.tsx';
import Table from '@/components/Table/Table.tsx';
import Bot from '@/components/Bot/Bot.tsx';
import ErrorBoundary from '@/utils/components/ErrorBoundary.tsx';
import { Toaster } from 'react-hot-toast';
import Controllers from '@/utils/components/Controllers.tsx';

function App() {
	return (
		<ErrorBoundary>
			<Toaster position='top-right'/>
			<Controllers />
			<Display>
				<Player />
				<Bot />
				<Table />
				<Deck />
				<Fall />
			</Display>
			<Menu />
		</ErrorBoundary>
	);
}

export default App;
