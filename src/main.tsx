import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomSheetProvider from "./provider/BottomSheet/index.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import LoadingProvider from "./provider/Loading/index.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <BottomSheetProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <App />
          </BottomSheetProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
