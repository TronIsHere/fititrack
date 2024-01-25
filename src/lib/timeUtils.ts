import { TSleep } from "@/components/types/DataTypes";

export const calculateSleepHours = (dayData: TSleep[]) => {
  return dayData.reduce((total, current) => {
    // Extract the date part from the ISO string
    const datePart = current.date.split("T")[0];
    // Combine the date part with the 'from' and 'to' times
    const fromDateTime: Date = new Date(`${datePart}T${current.from}`);
    const toDateTime: Date = new Date(`${datePart}T${current.to}`);

    if (isNaN(fromDateTime.getTime()) || isNaN(toDateTime.getTime())) {
      console.error("Invalid date format in calculateTotalSleepPerDay");
      return total;
    }

    // Check if the 'to' time is on the next day and adjust
    if (toDateTime < fromDateTime) {
      toDateTime.setDate(toDateTime.getDate() + 1);
    }

    // Calculate the duration in hours and add it to the total
    const durationHours =
      (toDateTime.getTime() - fromDateTime.getTime()) / (1000 * 60 * 60);
    return total + durationHours;
  }, 0);
};

type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const groupByDayOfWeek = (sleepData: TSleep[]) => {
  const dayOfWeekData: { [key in DayOfWeek]: typeof sleepData } = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };

  sleepData.forEach((entry) => {
    const dayOfWeek = new Date(entry.date).toLocaleString("en-US", {
      weekday: "short",
    }) as DayOfWeek;
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
export const isTimesValid = (time1: string, time2: string) => {
  const date = new Date(); // Replace this with your actual date state

  // Create Date objects for comparison
  const fromDateTime = new Date(date);
  const [fromHours, fromMinutes] = time1.split(":");
  fromDateTime.setHours(parseInt(fromHours, 10), parseInt(fromMinutes, 10));

  const toDateTime = new Date(date);
  const [toHours, toMinutes] = time2.split(":");
  toDateTime.setHours(parseInt(toHours, 10), parseInt(toMinutes, 10));

  // Check if the 'from' time is after the 'to' time, indicating an overnight span
  if (fromDateTime > toDateTime) {
    // Adjust 'toDateTime' to the next day
    toDateTime.setDate(toDateTime.getDate() + 1);
  }

  // Check if the 'from' time is before the 'to' time
  if (fromDateTime < toDateTime) {
    // Proceed with valid time range
    return true;
    // Here you can add further logic to handle the valid time range
  } else {
    // Handle invalid time range
    return false;
    // Here you can add logic to notify the user about the invalid time range
  }
};
