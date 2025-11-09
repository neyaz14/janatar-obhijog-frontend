import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./router/routes.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./utils/i18n.js";
import { AuthProvider } from "./Provider/authProvider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
