import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import App from "./App";
import AppContextProvider from "./components/providers/AppContextProvider";
import NotFound from "./components/NotFound";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
