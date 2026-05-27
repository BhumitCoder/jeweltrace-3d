import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { getRouter } from "./router";
import { VisitorTracker } from "./components/VisitorTracker";
import "./styles.css";

const queryClient = new QueryClient();
const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <VisitorTracker />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: { background: "#1a1508", border: "1px solid #c9a84c44", color: "#f5e6c0" },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
