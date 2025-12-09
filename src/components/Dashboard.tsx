import { Achievements } from "./Achievements";
import { StreakDays } from "./StreakDays";
import { useMe } from "@/hooks/useMe";
import { Button } from "./UI/Button";
import { Link } from "react-router";
import { ArrowLeft, Smile } from "lucide-react";
import { CategoriesChartStats } from "./CategoriesChartStats";
import { ToDosStats } from "./ToDosStats";
import { UpcomingTodos } from "./UpcomingTodos";
import { LongestDayStreak } from "./LongestDayStreak";
import { ClockCard } from "./Clock";

export const Dashboard = () => {
  const { data: loggedUser, isLoading, error } = useMe();

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="h-full p-3 grid grid-cols-12 md:grid-rows-6 gap-2 rounded-xl">
      <div className="row-span-1 md:row-span-2 bg-gradient-to-tr from-blue-600/75 via-purple-600/75 to-pink-500/75 shadow shadow-primary col-span-12 md:col-span-6 rounded-2xl">
        <div className="flex justify-between p-3">
          <div className="text-start text-gray-800 mt-1">
            <h2 className="text-md md:text-2xl font-extralight flex items-center flex-nowrap">
              <span className="text-gray-100 dark:text-gray-400">
                Welcome,{" "}
              </span>
              <span className="text-pink-400 dark:text-pink-500 capitalize text-md md:text-2xl font-extrabold">
                {loggedUser.username}
              </span>
              <Smile className="w-6 h-6 text-yellow-400 ml-1 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-100 dark:text-gray-400">
              Track your progress with{" "}
              <span className="font-extrabold">sweet</span> dashboard
            </p>
            <Button
              asChild
              className="mt-5 bg-pink-400 hover:bg-pink-500 duration-300"
            >
              <Link to={"/"}>
                <ArrowLeft /> Back
              </Link>
            </Button>
          </div>
          <StreakDays />
        </div>
      </div>

      <div className="row-span-1 md:row-span-2 bg-gradient-to-bl from-cyan-600/75 via-blue-600/75 to-indigo-600/75 shadow shadow-primary col-span-12 md:col-span-6 rounded-2xl">
        <div className="p-3">
          <Achievements />
        </div>
      </div>

      <div className="col-span-6 md:col-span-4 rounded-2xl row-span-1">
        <LongestDayStreak />
      </div>

      <div className="col-span-6 md:col-span-4 rounded-2xl row-span-1">
        <ClockCard />
      </div>

      <div className="col-span-12 md:col-span-4 rounded-2xl row-span-1 md:row-span-4">
        <UpcomingTodos />
      </div>

      <div className="col-span-12 md:col-span-4 rounded-2xl row-span-1 md:row-span-2">
        <CategoriesChartStats />
      </div>

      <div className="col-span-12 md:col-span-4 rounded-2xl row-span-1 md:row-span-2">
        <ToDosStats />
      </div>
    </div>
  );
};
