import { useCompletedTodos } from "@/hooks/Todo/useCompletedTodos";
import { calcConsequitiveDays } from "@/lib/utils";
import type { TodoStrapi } from "@/types";
import { useMemo } from "react";
import { Card, CardContent } from "./UI/card";

export const LongestDayStreak = () => {
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
    <Card className="h-full bg-gradient-to-br from-amber-500/75 to-orange-500/75 border-none shadow shadow-primary p-0">
      <CardContent className="p-2 md:p-4 flex items-center gap-3">
        <span className="text-3xl">🔥</span>
        <div>
          <p className="text-white/90 text-xs font-medium">Best Streak</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">{longest}</span>
            <span className="text-white/80 text-sm">days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
