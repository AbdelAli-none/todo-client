import { Avatar } from "@radix-ui/react-avatar";
import { Card, CardContent, CardTitle } from "./UI/card";
import { useCompletedTodos } from "@/hooks/Todo/useCompletedTodos";
import { useMemo } from "react";
import type { TodoStrapi } from "@/types";
import { calcConsequitiveDays } from "@/lib/utils";

const achievements = [
  {
    name: "Novice",
    icon: "🎯",
    requirement: 1,
    color: "text-slate-300 dark:text-slate-400",
  },
  {
    name: "Consistent",
    icon: "🔥",
    requirement: 7,
    color: "text-green-400 dark:text-green-500",
  },
  {
    name: "Dedicated",
    icon: "🚀",
    requirement: 14,
    color: "text-blue-600 dark:text-blue-500",
  },
  {
    name: "Elite",
    icon: "⚡",
    requirement: 30,
    color: "text-purple-400 dark:text-purple-500",
  },
  {
    name: "Legend",
    icon: "👑",
    requirement: 100,
    color: "text-amber-500 dark:text-amber-400",
  },
];

export const Achievements = () => {
  const { data: completedTodos, isLoading } = useCompletedTodos();

  const dates = useMemo(() => {
    if (!completedTodos) return;
    const completedDates = completedTodos
      .map((todo: TodoStrapi) => todo.completedAt)
      .filter((date: string) => date);

    return [...new Set(completedDates)];
  }, [completedTodos]);

  if (isLoading || !completedTodos || !dates) return;

  const { longest } = calcConsequitiveDays(dates as string[]);
  return (
    <>
      <h1 className="text-xl mb-3 text-yellow-400 font-thin">
        🏆 Achievements
      </h1>
      <div className="grid grid-cols-5 gap-x-3">
        {achievements.map((achievement, idx) => (
          <Card
            key={idx}
            className={`py-2 block h-fit bg-transparent hover:bg-black/10 hover:scale-105 duration-500 border-gray/50 dark:border dark:border-gray/30 shadow-md ${
              achievement.requirement <= longest ? "grayscale-0" : "grayscale"
            }`}
          >
            <CardTitle className="font-thin text-sm text-gray-100 mb-1">
              {achievement.name}
            </CardTitle>
            <CardContent className="flex-1 p-0">
              <Avatar className="text-3xl">{achievement.icon}</Avatar>
              <p className={`font-bold ${achievement.color} mt-2`}>
                {achievement.requirement}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
