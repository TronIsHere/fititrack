import { getDaysInMonth } from "date-fns";

const date = new Date();

export const getMonthDays = getDaysInMonth(date.getMonth());
