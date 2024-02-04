import { TSleep } from "@/components/types/DataTypes";
import moment from "moment";
type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const calculateSleepHours = (dayData: TSleep[]): number => {
  return dayData.reduce((total, current) => {
    // Create moment objects for 'from' and 'to' times
    const fromDateTime = moment(`${current.date}T${current.from}`);
    const toDateTime = moment(`${current.date}T${current.to}`);

    if (!fromDateTime.isValid() || !toDateTime.isValid()) {
      console.error("Invalid date format in calculateSleepHours");
      return total;
    }

    // Check if the 'to' time is on the next day and adjust
    if (toDateTime.isBefore(fromDateTime)) {
      toDateTime.add(1, "day");
    }

    // Calculate the duration in hours and add it to the total
    const durationHours = toDateTime.diff(fromDateTime, "hours", true);
    return total + durationHours;
  }, 0);
};

export const groupByDayOfWeek = (sleepData: TSleep[]) => {
  const dayOfWeekData: { [key in DayOfWeek]: TSleep[] } = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };

  sleepData.forEach((entry) => {
    const dayOfWeek = moment(entry.date).format("ddd") as DayOfWeek;
    if (dayOfWeek in dayOfWeekData) {
      dayOfWeekData[dayOfWeek].push(entry);
    }
  });

  return dayOfWeekData;
};
export const calculateTotalSleepPerDay = (dayData: TSleep[]) => {
  return dayData.reduce((total, current) => {
    const datePart = current.date.split("T")[0];
    const fromDateTime: Date = new Date(`${datePart}T${current.from}`);
    const toDateTime: Date = new Date(`${datePart}T${current.to}`);

    if (isNaN(fromDateTime.getTime()) || isNaN(toDateTime.getTime())) {
      console.error("Invalid date format in calculateTotalSleepPerDay");
      return total;
    }

    if (toDateTime < fromDateTime) {
      toDateTime.setDate(toDateTime.getDate() + 1);
    }

    const durationHours =
      (toDateTime.getTime() - fromDateTime.getTime()) / (1000 * 60 * 60);
    return total + durationHours;
  }, 0);
};

export const isTimesValid = (time1: string, time2: string): boolean => {
  // Create moment objects for comparison
  const fromTime = moment(time1, "HH:mm");
  const toTime = moment(time2, "HH:mm");

  // Check if the 'from' time is after the 'to' time, indicating an overnight span
  if (fromTime.isAfter(toTime)) {
    // Adjust 'toTime' to the next day
    toTime.add(1, "day");
  }

  // Check if the 'from' time is before the 'to' time
  return fromTime.isBefore(toTime);
};


