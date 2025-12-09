import type React from "react";

export type Category = {
  documentId: string;
  name: string;
  iconCategory: string;
  color: string;
};

export type AlertDeleteCateogryContextProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TtargetedCategory = Category[];

export type TdefaultToDo = {
  title: string;
  description: string;
  isDone: boolean;
  category: {
    iconCategory: string;
    name: string;
    color: string;
  };
  priority: {
    iconPriority: string;
    level: string;
    value: number;
  };
};

export type ShowToDosContextProps = {
  toDos: TdefaultToDo[];
  setToDos: React.Dispatch<React.SetStateAction<TdefaultToDo[]>>;
};

export type ToDoInfoContextProps = {
  toDo: TodoStrapi;
  setToDo: React.Dispatch<React.SetStateAction<TodoStrapi>>;
};

export type CategoriesContextProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

// Strapi Data
// ---------------------------
export interface TodoStrapi {
  id?: number;
  documentId?: string;
  title: string;
  description: string;
  isDone: boolean;
  completedAt?: string;
  category: CategoryStrapi;
  priority: TPriorityItemStrapi;
}

export interface CategoryStrapi {
  id?: number;
  documentId?: string;
  colorCategory: string;
  iconCategory: string;
  nameCategory: string;
}

export type TPriorityItemStrapi = {
  id?: number;
  documentId?: string;
  iconPriority: string;
  levelPriority: string;
  valuePriority: number;
};
