import { useContext } from "react";
import { ToDoInfoContext } from "./ToDoInfoContext";

export const useToDoInfo = () => {
  const ctx = useContext(ToDoInfoContext);
  if (!ctx) {
    throw new Error("useToDoInfo must be used within an ToDoInfoProvider");
  }
  return ctx;
};
