import App from "./App";
import AppContextProvider from "./context/AppContext";
import NotFound from "./pages/NotFound";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary, ErrorFallback, ScrollToTop } from "./components";
import { ReactQueryDevtools } from "react-query/devtools";
import { sentry } from "./lib/sentry";

// Enable error logging
sentry.init();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AppContextProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<App />} />
          </Routes>
          <ReactQueryDevtools position="bottom-right" />
        </AppContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
