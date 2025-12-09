import noTodos from "@/Imgs/noTodos.png";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./UI/card";
import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";
import { useUpcomingTodos } from "@/hooks/Todo/useUpcomingTodos";
import type { TodoStrapi } from "@/types";
import { ScrollArea } from "./UI/scroll-area";

export const UpcomingTodos = () => {
  const { data: upcomingTodos } = useUpcomingTodos();

  if (!upcomingTodos) return;

  return (
    <Card className="h-full overflow-y-auto hideScrollbar text-start flex flex-col p-2 gap-0 shadow shadow-primary bg-gradient-to-bl from-yellow-400/75 via-yellow-400/75 to-yellow-300/75">
      {!upcomingTodos.length ? (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="m-auto text-center overflow-hidden p-2 relative h-full flex flex-wrap justify-center items-center"
        >
          <div>
            <img className="w-[220px] m-auto" src={noTodos} />
            <p className="text-gray dark:text-gray-200 mt-6 text-sm">
              You haven’t any tasks to complete yet. Click{" "}
              <span className="bg-orange-500 text-white font-semibold px-2 rounded-md">
                +
              </span>{" "}
              above on header to create one and see progress!
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <CardHeader className="items-center pb-0 px-0 flex text-sky-900 dark:text-blue-900 mb-5">
            <Flame className="w-5 h-5" />
            <CardTitle className="text-md font-thin">Upcoming Tasks</CardTitle>
          </CardHeader>
          <ScrollArea className="w-full h-[250px] z-20">
            <CardContent className="flex flex-col flex-1 space-y-2 pb-0 px-2 pe-3.5">
              {upcomingTodos.map((todo: TodoStrapi, idx: string) => {
                const {
                  title,
                  category: { iconCategory },
                  priority: { iconPriority },
                } = todo;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-lg shrink-0">{iconPriority}</span>
                      <p className="font-medium text-sky-900 truncate">
                        {title}
                      </p>
                    </div>
                    <span className="text-md shrink-0 animate-bounce">
                      {iconCategory}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </ScrollArea>
          <CardFooter className="flex-col gap-2 text-sm mt-7">
            <div className="flex items-center gap-2 leading-none font-thin">
              Upcoming tasks should complete! 💪
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
