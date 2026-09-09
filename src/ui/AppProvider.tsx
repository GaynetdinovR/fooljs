import { ReactNode } from 'react';
import { AppContext } from '@/ui/AppContext.tsx';

type AppProviderProps = {
	children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
