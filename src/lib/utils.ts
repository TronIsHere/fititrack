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
  let totalSleepTime = 0;
  let totalDeepSleepTime = 0;
  let totalLightSleepTime = 0;

  userSleep.forEach((sleepEntry) => {
    const sleepDuration = calculateSleepDuration(sleepEntry);
    totalSleepTime += sleepDuration;

    // Calculate deep sleep (first 3 hours of sleep)
    const deepSleepTime = Math.min(sleepDuration, 3);
    totalDeepSleepTime += deepSleepTime;

    // Remaining time is considered light sleep
    const lightSleepTime = sleepDuration - deepSleepTime;
    totalLightSleepTime += lightSleepTime;
  });

  const deepSleepPercentage = (totalDeepSleepTime / totalSleepTime) * 100;
  const lightSleepPercentage = (totalLightSleepTime / totalSleepTime) * 100;

  return { deepSleepPercentage, lightSleepPercentage };
};

function calculateSleepDuration(sleepEntry: TSleep): number {
  const fromTime = new Date(`1970-01-01T${sleepEntry.from}:00Z`);
  let toTime = new Date(`1970-01-01T${sleepEntry.to}:00Z`);

  // If toTime is earlier than fromTime, it means sleep went past midnight
  if (toTime < fromTime) {
    toTime.setDate(toTime.getDate() + 1);
  }

  const durationHours =
    (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);
  return durationHours;
}
export const calculateSleepHoursDeep = (userSleep: TSleep[]) => {
  const totalSleepTime = userSleep.reduce((total, sleepEntry) => {
    return total + calculateTotalSleepPerDay([sleepEntry]);
  }, 0);

  const days = userSleep.length;
  const averageSleepTimePerDay = totalSleepTime / days;

  // Estimate deep sleep and light sleep based on total sleep duration
  const deepSleepTime = parseFloat((averageSleepTimePerDay * 0.2).toFixed(2)); // Round to 2 decimal places
  const lightSleepTime = parseFloat((averageSleepTimePerDay * 0.5).toFixed(2)); // Round to 2 decimal places

  // Calculate average sleep duration as a percentage of 8 hours
  const sleepDurationPercentage = parseFloat(
    ((averageSleepTimePerDay / 8) * 100).toFixed(2)
  ); // Round to 2 decimal places

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
export const calculateAverageWeeklyWeightChange = (
  weightData: TWeight[]
): { averageChange: number; gained: boolean } => {
  if (!weightData || weightData.length <= 1) {
    return { averageChange: 0, gained: false };
  }

  // Sort the weight data by date in ascending order
  const sortedWeightData = [...weightData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalWeightChange = 0;
  let totalDays = 0;

  for (let i = 1; i < sortedWeightData.length; i++) {
    const startDate = new Date(sortedWeightData[i - 1].date);
    const endDate = new Date(sortedWeightData[i].date);
    const daysDifference =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    const weightChange =
      sortedWeightData[i].weight - sortedWeightData[i - 1].weight;

    totalWeightChange += weightChange;
    totalDays += daysDifference;
  }

  const averageWeeklyWeightChange =
    totalDays > 0
      ? (totalWeightChange / totalDays) * 7 // Scale to weekly change
      : 0;

  return {
    averageChange: parseFloat(Math.abs(averageWeeklyWeightChange).toFixed(1)),

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
      let workoutHour = workout.duration / 60;
      totalDuration += workoutHour * workout.checkIns;
    }
  });

  return totalDuration;
};
