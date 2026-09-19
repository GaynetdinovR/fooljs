import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PlayerControlsProvider from '@/ui/PlayerControlsProvider.tsx';

import './styles/styles.sass';

const root = document.getElementById('root');

createRoot(root).render(
	<StrictMode>
		<PlayerControlsProvider>
			<App />
		</PlayerControlsProvider>
	</StrictMode>
);
