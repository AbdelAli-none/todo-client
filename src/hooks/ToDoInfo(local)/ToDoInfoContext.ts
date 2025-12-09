import type { ToDoInfoContextProps } from "@/types";
import { createContext } from "react";

export const ToDoInfoContext = createContext<ToDoInfoContextProps | null>(null);
