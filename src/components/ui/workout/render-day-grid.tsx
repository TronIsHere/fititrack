import { getMonthDays } from "@/lib/dateUtils";
import { TWorkout } from "@/components/types/dashboardTypes";

export const renderDayGrid = (state: TWorkout) => {
  return [...Array(getMonthDays)].map((_, index) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      index + 1
    );

    const day = state.days?.find(
      (d) =>
        d.date.getDate() === targetDate.getDate() &&
        d.date.getMonth() === targetDate.getMonth() &&
        d.date.getFullYear() === targetDate.getFullYear()
    );

    const isDone = day?.done ?? false;
    return (
      <div
        className={`w-4 h-4 rounded-[2px] ${
          isDone ? "bg-palletPurple-400" : "bg-palletGray-100"
        } m-1`}
        key={index}
      ></div>
    );
  });
};
