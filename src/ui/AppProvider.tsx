import { createContext, ReactNode, useMemo } from 'react';
import GameInitService from '@/core/GameInitService.ts';

type AppProviderProps = {
    children: ReactNode,
}

export const AppContext = createContext();

const AppProvider = ({ children }: AppProviderProps) => {
	const gameInit = useMemo(() => new GameInitService(null), [])

	return (
        <AppContext.Provider
            value={{
				gameInit
            }}
        >
            {children}
        </AppContext.Provider>
	);
};

export default AppProvider;