import { getDaysInMonth } from "date-fns";

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
