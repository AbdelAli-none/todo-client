"use client";

import { Layers2, TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./UI/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./UI/card";

import { motion } from "framer-motion";
import NoCompletedToDos from "../Imgs/emptyTwo.png";
import { useTodos } from "@/hooks/Todo/useTodos";
import type { TodoStrapi } from "@/types";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-4)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const ToDosStats = () => {
  const { data: toDosList } = useTodos();

  if (!toDosList) return null;

  const completedToDos = toDosList.filter((todo: TodoStrapi) => todo.isDone);
  const pendingToDos = toDosList.filter((todo: TodoStrapi) => !todo.isDone);

  const toDosData = [
    {
      object: "tasks",
      pending: pendingToDos.length,
      completed: completedToDos.length,
    },
  ];

  const totalToDos = toDosData[0].pending + toDosData[0].completed; // note that before you used this variable to handle showing no completed todos bg

  return (
    <Card className="text-start flex flex-col p-2 gap-0 shadow shadow-primary bg-gradient-to-bl from-green-400/75 via-green-400/75 to-green-300/75">
      {!toDosList.length ? (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="m-auto text-center overflow-hidden p-2 relative h-full flex flex-wrap justify-center items-center"
        >
          <div>
            <img className="w-[170px] m-auto" src={NoCompletedToDos} />
            <p className="text-gray dark:text-gray-200 mt-6 text-sm">
              You haven’t add any tasks yet. Click{" "}
              <span className="bg-green-500 text-white font-semibold px-2 rounded-md">
                +
              </span>{" "}
              above on header to create one and see progress!
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <CardHeader className="items-center pb-0 px-0 flex text-sky-900 dark:text-blue-900">
            <Layers2 className="w-5 h-5" />
            <CardTitle className="text-md font-thin">
              Your Tasks Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[210px]"
            >
              <RadialBarChart
                data={toDosData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalToDos.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground font-semibold"
                            >
                              Tasks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="pending"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-desktop)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="completed"
                  fill="var(--color-mobile)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-thin">
              Completed and pending tasks! 💪
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
