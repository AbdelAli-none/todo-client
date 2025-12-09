import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calcConsequitiveDays = (dates: string[]) => {
  let streakDay = 1;
  let longest = 1;
  let total = dates.length;

  if (dates.length === 1) return { streakDay: 1, longest: 1, total: 1 };

  for (let i = 1; i < dates.length; i++) {
    let prev = new Date(dates[i - 1]);
    let curr = new Date(dates[i]);

    let dif =
      Math.round(curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (dif === 1) {
      streakDay++;
      longest = Math.max(streakDay, longest);
    } else {
      streakDay = 1;
    }
  }
  return { streakDay, longest, total };
};
