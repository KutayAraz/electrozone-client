import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Notifications } from "@/components/ui/notifications";
import { Spinner } from "@/components/ui/spinner";
import { persistor, store } from "@/stores/store";

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
            <Notifications />
            <PersistGate loading={<Spinner />} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </HelmetProvider>
    </React.Suspense>
  );
};
