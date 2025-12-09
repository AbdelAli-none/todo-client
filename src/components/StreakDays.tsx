"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent } from "@/components/UI/card";
import { type ChartConfig, ChartContainer } from "@/components/UI/chart";
import { useMemo } from "react";
import { useCompletedTodos } from "@/hooks/Todo/useCompletedTodos";
import type { TodoStrapi } from "@/types";
import { calcConsequitiveDays } from "@/lib/utils";

const chartConfig = {} satisfies ChartConfig;

export const StreakDays = () => {
  const { data: completedTodos, isLoading } = useCompletedTodos();

  const dates = useMemo(() => {
    if (!completedTodos) return;
    const completedDates = completedTodos
      .map((todo: TodoStrapi) => todo.completedAt)
      .filter((date: string) => date);

    return [...new Set(completedDates)];
  }, [completedTodos]);

  if (isLoading || !completedTodos || !dates) return;

  const { streakDay, longest } = calcConsequitiveDays(dates as string[]);

  const achievements = [
    {
      name: "First Step",
      icon: "🎯",
      requirement: 1,
      unlocked: longest >= 1,
    },
    {
      name: "Hot Streak",
      icon: "🔥",
      requirement: 7,
      unlocked: longest >= 7,
    },
    {
      name: "On Fire!",
      icon: "🚀",
      requirement: 14,
      unlocked: longest >= 14,
    },
    {
      name: "Unstoppable",
      icon: "⚡",
      requirement: 30,
      unlocked: longest >= 30,
    },
    {
      name: "Legend",
      icon: "👑",
      requirement: 100,
      unlocked: longest >= 100,
    },
  ];

  // adjusting current streak day with next goal
  const nextStage = (() => {
    for (let i = achievements.length - 1; i >= 0; i--) {
      const stage = achievements[i];

      if (streakDay >= stage.requirement) return achievements[i + 1];
    }
  })();

  const chartData = [{ streakDay: streakDay, fill: "#F1C40F" }];

  return (
    <Card className="flex flex-col bg-transparent border-none shadow-none p-0">
      <CardContent className="flex-1 p-0">
        <ChartContainer className="h-[130px] w-[130px]" config={chartConfig}>
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={streakDay * (360 / Number(nextStage?.requirement))}
            innerRadius={58}
            outerRadius={78}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background duration-1000"
              polarRadius={[54, 65]}
            />
            <RadialBar dataKey="streakDay" cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={Number(viewBox.cy) - 10}
                          className="fill-foreground text-2xl font-bold font-mono"
                        >
                          {streakDay.toLocaleString()}
                        </tspan>
                        <tspan
                          x={Number(viewBox.cx) + 5}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-muted-foreground text-sm"
                        >
                          Day streak🔥
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
