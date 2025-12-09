// src/hooks/useStreakFromTasks.ts
import { useState, useEffect } from "react";

const STRAPI_URL = "http://localhost:1337/api"; // Change once
const getToken = () => localStorage.getItem("jwt"); // or your auth method

interface Streak {
  current: number;
  longest: number;
  totalCompletedDays: number;
  todayCompleted: boolean;
}

export const useStreakDay = () => {
  const [streak, setStreak] = useState<Streak>({
    current: 0,
    longest: 0,
    totalCompletedDays: 0,
    todayCompleted: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchStreak = async () => {
    setLoading(true);
    try {
      // Get all completed tasks for the logged-in user
      const res = await fetch(
        `${STRAPI_URL}/todos?filters[users][$eq]=me&filters[isDone][$eq]=true&sort=completedAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const { data } = await res.json();

      // Extract the date part from completedAt (or updatedAt)
      const completedDates = data
        .map((todo: any) => {
          const dateStr = todo.attributes.completedAt;
          return dateStr ? dateStr.slice(0, 10) : null;
        })
        .filter(Boolean);

      // Remove duplicates and sort descending
      const uniqueDates = Array.from(new Set(completedDates)).sort().reverse();

      const today = new Date().toISOString().slice(0, 10);
      let current = 0;
      let longest = 0;
      let temp = 0;

      for (let i = 0; i < uniqueDates.length; i++) {
        const date = uniqueDates[i];
        const prev = uniqueDates[i + 1];

        // Start counting if today is completed
        if (i === 0 && date === today) temp = 1;

        if (prev) {
          const diffDays = Math.round(
            (new Date(String(date)).getTime() -
              new Date(String(prev)).getTime()) /
              86400000
          );
          if (diffDays === 1) {
            temp++;
          } else {
            longest = Math.max(longest, temp);
            temp = 1; // reset for new chain
          }
        }
      }

      // Final longest check
      longest = Math.max(longest, temp);
      current = uniqueDates[0] === today ? temp : 0;

      setStreak({
        current,
        longest,
        totalCompletedDays: uniqueDates.length,
        todayCompleted: uniqueDates.includes(today),
      });
    } catch (err) {
      console.error("Streak fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getToken()) fetchStreak();
  }, []);

  return { streak, loading, refetch: fetchStreak };
};
