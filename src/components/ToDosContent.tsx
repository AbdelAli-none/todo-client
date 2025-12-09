import { NoTasks } from "@/layout/NoTasks";
import { ToDos } from "./ToDos";
import { useTodos } from "@/hooks/Todo/useTodos";

export const ToDosContent = () => {
  const { data: toDosList } = useTodos();
  if (!toDosList) return;
  return toDosList && toDosList.length ? <ToDos /> : <NoTasks />;
};
