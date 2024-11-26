import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { persistor, store } from "@/stores/store";
import { Spinner } from "@/components/ui/spinner";

interface AppProviderProps {
    children: React.ReactNode;
}

const theme = createTheme({
    typography: {
        fontFamily: "Nunito, sans-serif",
    },
});

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <HelmetProvider>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <PersistGate loading={<Spinner />} persistor={persistor}>
                            {children}
                        </PersistGate>
                    </Provider>
                </ThemeProvider>
            </HelmetProvider>
        </React.Suspense>
    );
};
