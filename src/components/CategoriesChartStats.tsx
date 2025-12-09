"use client";

import { Layers, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  CardTitle,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./UI/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./UI/chart";
import { motion } from "framer-motion";
import NoCompletedToDos from "../Imgs/empty.png";
import { useCategories } from "@/hooks/Categories/useCategories";
import { useTodos } from "@/hooks/Todo/useTodos";
import type { CategoryStrapi, TodoStrapi } from "@/types";

export const CategoriesChartStats = () => {
  const { data: categories } = useCategories();
  const { data: toDosList } = useTodos();

  const categoriesData: CategoryStrapi[] = categories.map(
    (category: CategoryStrapi) => {
      return {
        category: category.nameCategory,
        toDoCounts: toDosList.filter(
          (toDo: TodoStrapi) =>
            toDo.category.nameCategory === category.nameCategory
        ).length,
        fill: category.colorCategory,
      };
    }
  );

  const categoriesConfig = Object.fromEntries(
    categories.map((category: CategoryStrapi) => [
      category.nameCategory,
      {
        label: category.nameCategory,
        color: category.colorCategory,
      },
    ])
  );

  const totalToDos = toDosList.length;

  return (
    <Card className="text-start flex flex-col p-2 gap-0 shadow shadow-primary bg-gradient-to-bl from-sky-400/75 via-sky-400/75 to-sky-300/75">
      {!totalToDos ? (
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
              <span className="bg-blue-500 text-white font-semibold px-2 rounded-md">
                +
              </span>{" "}
              above on header to create one and see progress!
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <CardHeader className="items-center pb-0 px-0 flex text-sky-900 dark:text-blue-900">
            <Layers className="w-5 h-5" />
            <CardTitle className="text-md font-thin">
              Tasks by Category{" "}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={categoriesConfig}
              className="mx-auto aspect-square max-h-[210px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={categoriesData}
                  dataKey="toDoCounts"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                >
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
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalToDos.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground font-semibold"
                            >
                              Tasks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-thin">
              You’re getting more done lately! 💪{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
