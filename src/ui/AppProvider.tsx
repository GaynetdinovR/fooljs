import { createContext, ReactNode } from 'react';

type AppProviderProps = {
    children: ReactNode,
}

export const AppContext = createContext();

const AppProvider = ({ children }: AppProviderProps) => {
	return (
        <AppContext.Provider
            value={{}}
        >
            {children}
        </AppContext.Provider>
	);
};

export default AppProvider;