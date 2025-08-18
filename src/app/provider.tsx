import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GlobalErrorFallback } from "@/components/errors/global-error-fallback";
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onError={(error, errorInfo) => {
        // Log to console in development
        if (import.meta.env.DEV) {
          console.error("Global Error Boundary caught:", error, errorInfo);
        }
      }}
      onReset={() => window.location.reload()}
    >
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
    </ErrorBoundary>
  );
};
