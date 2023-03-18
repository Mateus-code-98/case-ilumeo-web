import React from "react"
import AppProvider from "./hooks";
import { Routes } from "./routes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  );
};