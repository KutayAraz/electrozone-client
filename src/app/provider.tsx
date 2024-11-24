import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { persistor, store } from '@/stores/store';

interface AppProviderProps {
    children: React.ReactNode;
}

const theme = createTheme({
    typography: {
        fontFamily: 'Nunito, sans-serif',
    },
});

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    <p>Loading...</p>
                </div>
            }
        >
            <HelmetProvider>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <PersistGate
                            loading={
                                <div className="flex h-screen w-screen items-center justify-center">
                                    <p>Loading...</p>
                                </div>
                            }
                            persistor={persistor}
                        >
                            {children}
                        </PersistGate>
                    </Provider>
                </ThemeProvider>
            </HelmetProvider>
        </React.Suspense>
    );
};