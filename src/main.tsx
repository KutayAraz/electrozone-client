import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./setup/store";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
