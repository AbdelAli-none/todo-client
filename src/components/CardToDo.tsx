import { Circle, CircleCheckBig } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./UI/card";

import { motion } from "framer-motion";
import { DropdownMenuDialog } from "./DropDownToDo";
import type { TodoStrapi } from "@/types";
import { toast } from "sonner";
import { useToggleTodoStatus } from "@/hooks/Todo/useToggleTodoStatus";
import React from "react";

type CardToDoProps = {
  todoInfo: TodoStrapi;
};

export const CardToDo = React.memo(({ todoInfo }: CardToDoProps) => {
  if (!todoInfo) return null;

  const {
    documentId,
    title,
    description,
    isDone,
    category: {
      // renamed fields
      nameCategory: categoryTitle,
      colorCategory: categoryColor,
      iconCategory: categoryIcon,
    },
    priority: { iconPriority, levelPriority: levelPriority },
  } = todoInfo;

  const toggleTodoStatus = useToggleTodoStatus(isDone); // initially: false
  const undoCompletedTodo = useToggleTodoStatus(!isDone); // initially: true

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: isDone ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={isDone ? { opacity: 0, x: -40 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.5 }}
      className={`${
        isDone ? "bg-[#03f4332e]" : "bg-transparent"
      } flex-1/2 justify-start dark:bg-[#1e1e2f91] shadow-sm gap-1 rounded-2xl mb-1`} // isDone ? "bg-[#03a9f42e]" : "bg-transparent" ?!
    >
      <Card className={`text-start bg-transparent px-2 py-2 duration-1000`}>
        <CardHeader className="gap-0 px-3">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-sm font-normal flex items-center space-x-2">
              <p>
                {!isDone ? (
                  <Circle
                    className="w-5 hover:text-green-600 duration-300 cursor-pointer"
                    onClick={() => {
                      toggleTodoStatus.mutate(String(documentId), {
                        onSuccess: () => {
                          toast("Great job! You’ve finished a task.", {
                            description: "Click Undo to restore it to pending.",
                            action: {
                              label: "Undo",
                              onClick: () => {
                                undoCompletedTodo.mutate(String(documentId));
                              },
                            },
                          });
                        },
                      });
                    }}
                  />
                ) : (
                  <CircleCheckBig
                    onClick={() => {
                      toggleTodoStatus.mutate(String(documentId));
                    }}
                    className="w-5 text-green-600 hover:text-black dark:hover:text-white duration-300 cursor-pointer"
                  />
                )}
              </p>
              <span className="text-lg capitalize font-semibold">{title}</span>
            </CardTitle>

            <DropdownMenuDialog todoInfo={todoInfo} />
          </div>
          <CardDescription className="text-sm mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center pt-0 px-3">
          <div>
            <span className="flex items-center">
              {iconPriority}
              <p className="text-foreground text-sm capitalize">
                {levelPriority}
              </p>
            </span>
          </div>
          <div className="flex gap-x-1">
            <span
              className={`w-7 h-7 rounded-md flex justify-center items-center`}
              style={{ backgroundColor: categoryColor }}
            >
              {categoryIcon}
            </span>
            <span
              className={`text-xs font-semibol text-white px-2.5 py-1.5 rounded-lg`}
              style={{ backgroundColor: categoryColor }}
            >
              {categoryTitle}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
});
