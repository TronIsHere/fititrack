import { getDaysInMonth } from "date-fns";
import moment from "moment";
export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const date = new Date();

export const getMonthDays = getDaysInMonth(date.getMonth());

export const startOfDay = (date: Date): Date => {
  return moment(date).startOf("day").toDate();
};
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return moment(date1).startOf("day").isSame(moment(date2).startOf("day"));
};

export const getCurrentWeek = (): { startOfWeek: Date; endOfWeek: Date } => {
  // Start of the week (Monday)
  const startOfWeek = moment().startOf("isoWeek");
  // End of the week (Sunday)
  const endOfWeek = moment().endOf("isoWeek");

  return {
    startOfWeek: startOfWeek.toDate(),
    endOfWeek: endOfWeek.toDate(),
  };
};

export const getWeekStartDate = () => {
  // Start of the current week (default to Sunday)
  const startOfWeek = moment().startOf("isoWeek");

  return startOfWeek.format("YYYY-MM-DD");
};
