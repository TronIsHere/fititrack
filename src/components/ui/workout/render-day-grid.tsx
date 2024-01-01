import { getMonthDays } from "@/lib/dateUtils";
import { TWorkout } from "@/types/dashboardTypes";

export const renderDayGrid = (state: TWorkout) => {
  return [...Array(getMonthDays)].map((_, index) => {
    const day = state.days?.find((d) => d.date.getDate() === index + 1);
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
