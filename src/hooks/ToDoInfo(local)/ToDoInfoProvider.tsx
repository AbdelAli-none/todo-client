import type {TodoStrapi } from "@/types";
import type React from "react";
import { useState } from "react";
import { ToDoInfoContext } from "./ToDoInfoContext";

type ToDoInfoProviderProps = {
  children: React.ReactNode;
};

const defaultToDo: TodoStrapi = {
  title: "",
  description: "",
  isDone: false,
  category: {
    nameCategory: "",
    iconCategory: "",
    colorCategory: "",
  },
  priority: {
    iconPriority: "",
    levelPriority: "",
    valuePriority: 0,
  },
};

export const ToDoInfoProvider = ({ children }: ToDoInfoProviderProps) => {
  const [toDo, setToDo] = useState<TodoStrapi>(defaultToDo);

  return (
    <ToDoInfoContext.Provider value={{ toDo, setToDo }}>
      {children}
    </ToDoInfoContext.Provider>
  );
};
