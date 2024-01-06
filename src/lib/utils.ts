import { TDay } from "@/components/types/dashboardTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "./dateUtils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const calculateConsistency = (days: TDay[]) => {
  if (days.length === 0) {
    // Edge case: No days set
    return 0;
  }
  const doneDays = days.filter((day) => day.done).length;
  if (doneDays === days.length) {
    // Edge case: All days are marked as done
    return 100;
  }
  const totalDays = days.length;
  return totalDays > 0 ? (doneDays / totalDays) * 100 : 0;
};

export const calculateStreak = (days: TDay[]) => {
  if (!days || days.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (let i = days.length - 1; i >= 0; i--) {
    const day = new Date(days[i].date);
    day.setHours(0, 0, 0, 0);

    // Check if the day is the same as the current date
    if (isSameDay(day, currentDate)) {
      if (days[i].done) {
        streak++;
        // Move to the previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // If the most recent day is not done, break the streak
        break;
      }
    } else {
      // If there is a gap between days (missed workout), break the streak
      break;
    }
  }

  return streak;
};

export const isLastDoneDateToday = (days: TDay[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to the start of the day

  const lastDoneDay = [...days]
    .reverse()
    .find((day) => day.done && isSameDay(new Date(day.date), today));

  return Boolean(lastDoneDay);
};
