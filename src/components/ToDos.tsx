import { CardToDo } from "./CardToDo";
import { ScrollArea } from "./UI/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import { NoTasksCompletedIcon } from "./NoCompletedToDos";
import { AllToDosCompleted } from "./AllToDosCompleted";
import { useTodos } from "@/hooks/Todo/useTodos";
import type { TodoStrapi } from "@/types";

export const ToDos = () => {
  const { data: toDosList } = useTodos();

  if (!toDosList) return null;

  const completedToDos = toDosList.filter((todo: TodoStrapi) => todo.isDone);
  const pendingToDos = toDosList.filter((todo: TodoStrapi) => !todo.isDone);

  // console.log(toDosList);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
      className="grid grid-cols-1 md:grid-cols-[2fr_2fr] gap-3 overflow-hidden p-2 h-full"
    >
      <div className="flex flex-col p-2 overflow-auto border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/50 rounded-2xl hideScrollbar">
        <span className="block me-4 duration-1000 p-1 rounded-xl text-xl font-semibold text-orange-900 border border-orange-200 shadow-sm dark:from-orange-900/20 dark:to-pink-900/20 dark:text-orange-100 dark:border-orange-800/50 dark:shadow-orange-900/20">
          ⏳ Pending
        </span>
        <ScrollArea className="h-full w-full rounded-md">
          <div className="flex justify-center flex-wrap gap-1 mt-2 pe-4">
            <AnimatePresence mode="popLayout">
              {pendingToDos && pendingToDos.length ? (
                pendingToDos.map((toDo: TodoStrapi) => (
                  <CardToDo todoInfo={toDo} key={toDo.id} />
                ))
              ) : (
                <AllToDosCompleted />
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col p-2 overflow-auto shadow-forebackground border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/50 rounded-2xl hideScrollbar">
        <span className="block me-4 duration-1000 p-1 rounded-xl text-xl font-semibold text-green-900 border border-green-200 shadow-sm dark:from-green-900/20 dark:to-pink-900/20 dark:text-green-100 dark:border-green-800/50 dark:shadow-green-900/20">
          🎉 Completed
        </span>
        <ScrollArea className="h-full w-full rounded-md">
          <div className="flex justify-center flex-wrap gap-1 mt-2 pe-4">
            <AnimatePresence mode="popLayout">
              {completedToDos.length ? (
                completedToDos.map((todo: TodoStrapi) => (
                  <CardToDo todoInfo={todo} key={todo.id} />
                ))
              ) : (
                <NoTasksCompletedIcon />
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};
