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

  let isStreakContinuing = true;
  for (let i = days.length - 1; i >= 0; i--) {
    if (isSameDay(new Date(days[i].date), currentDate)) {
      if (!days[i].done && isStreakContinuing) {
        // Breaks the streak only if it's the most recent day and it's marked as undone
        isStreakContinuing = false;
      }
    } else {
      if (!isStreakContinuing || !days[i].done) {
        break; // Stops counting if the streak is already broken or the day is not done
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    if (isStreakContinuing) {
      streak++;
    }
  }

  return streak;
};
