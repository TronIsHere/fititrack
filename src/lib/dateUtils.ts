import { getDaysInMonth } from "date-fns";

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const date = new Date();

export const getMonthDays = getDaysInMonth(date.getMonth());
export const startOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
export const isSameDay = (date1: Date, date2: Date) => {
  const d1 = new Date(date1);
  d1.setHours(0, 0, 0, 0);
  const d2 = new Date(date2);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
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
