import { ThemeProvider } from "./hooks/Theme/ThemeProvider";
import "./App.css";
import { ToDoInfoProvider } from "./hooks/ToDoInfo(local)/ToDoInfoProvider";
import { Router } from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as ShadcnToaster } from "sonner";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToDoInfoProvider>
          <Router />
          <ShadcnToaster />
        </ToDoInfoProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
