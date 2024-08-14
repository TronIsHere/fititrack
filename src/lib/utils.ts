import { TDay, TSleep, TWeight, TWorkout } from "@/components/types/DataTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "./dateUtils";
import { calculateTotalSleepPerDay } from "./timeUtils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeFirstLetter(string: string) {
  if (!string) return "Baby";
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
export const calculateSleepPercentages = (userSleep: TSleep[]) => {
  const totalSleepTime = userSleep.reduce((total, sleepEntry) => {
    return total + calculateTotalSleepPerDay([sleepEntry]);
  }, 0);

  const days = userSleep.length;
  const averageSleepTimePerDay = totalSleepTime / days;

  // Calculate deep sleep and light sleep percentages
  const deepSleepTime =
    averageSleepTimePerDay >= 7 && averageSleepTimePerDay <= 8 ? 105 / 60 : 0; // Convert minutes to hours
  const lightSleepTime =
    averageSleepTimePerDay >= 7 && averageSleepTimePerDay <= 8 ? 240 / 60 : 0; // Convert minutes to hours

  const deepSleepPercentage = (deepSleepTime / averageSleepTimePerDay) * 100;
  const lightSleepPercentage = (lightSleepTime / averageSleepTimePerDay) * 100;

  return { deepSleepPercentage, lightSleepPercentage };
};
export const calculateSleepHoursDeep = (userSleep: TSleep[]) => {
  const totalSleepTime = userSleep.reduce((total, sleepEntry) => {
    return total + calculateTotalSleepPerDay([sleepEntry]);
  }, 0);

  const days = userSleep.length;
  const averageSleepTimePerDay = totalSleepTime / days;

  // Calculate deep sleep and light sleep times
  const deepSleepTime =
    averageSleepTimePerDay >= 7 && averageSleepTimePerDay <= 8 ? 105 / 60 : 0; // Convert minutes to hours
  const lightSleepTime =
    averageSleepTimePerDay >= 7 && averageSleepTimePerDay <= 8 ? 240 / 60 : 0; // Convert minutes to hours

  // Calculate average sleep duration as a percentage of 8 hours
  const sleepDurationPercentage = (averageSleepTimePerDay / 8) * 100;

  return { deepSleepTime, lightSleepTime, sleepDurationPercentage };
};
export const calculateMostFrequentWorkout = (workouts: TWorkout[]) => {
  const workoutCounts = workouts.reduce((counts, workout) => {
    counts[workout.type] = (counts[workout.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  let mostFrequentWorkout = Object.keys(workoutCounts)[0];
  for (const workoutType in workoutCounts) {
    if (workoutCounts[workoutType] > workoutCounts[mostFrequentWorkout]) {
      mostFrequentWorkout = workoutType;
    }
  }

  return mostFrequentWorkout;
};
export const calculateAverageWeeklyWeightChange = (weightData: TWeight[]) => {
  if (weightData.length <= 1) {
    return 0;
  }
  // Sort the weight data by date in ascending order
  const weightDataCopy = [...weightData];
  weightDataCopy.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalWeeks = 0;
  let totalWeightChange = 0;

  for (
    let i = Math.min(7, weightDataCopy.length - 1);
    i < weightDataCopy.length;
    i += 7
  ) {
    const weightChange =
      weightDataCopy[i].weight - weightDataCopy[i - Math.min(7, i)].weight;
    totalWeightChange += weightChange;
    totalWeeks++;
  }

  const averageWeeklyWeightChange = totalWeeks
    ? totalWeightChange / totalWeeks
    : 0;

  return {
    averageChange: Math.abs(averageWeeklyWeightChange),
    gained: averageWeeklyWeightChange > 0,
  };
};
export const calculateMostFrequentMuscleGroups = (workouts: TWorkout[]) => {
  const muscleCounts = workouts.reduce((counts, workout) => {
    if (workout.muscles) {
      workout.muscles.forEach((muscle) => {
        counts[muscle] = (counts[muscle] || 0) + 1;
      });
    }
    return counts;
  }, {} as Record<string, number>);

  const sortedMuscleGroups = Object.entries(muscleCounts).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedMuscleGroups.slice(0, 4).map(([muscleGroup]) => muscleGroup);
};
export const calculateTotalWorkoutDuration = (workouts: TWorkout[]) => {
  let totalDuration = 0;

  workouts.forEach((workout) => {
    if (workout.duration && workout.checkIns) {
      totalDuration += workout.duration * workout.checkIns;
    }
  });

  return totalDuration;
};
