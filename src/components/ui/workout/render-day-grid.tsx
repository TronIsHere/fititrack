import { getMonthDays } from "@/lib/dateUtils";
import { TWorkout } from "@/components/types/workout";

export const renderDayGrid = (
  state: TWorkout,
  color: string = "palletPurple-400"
) => {
  return [...Array(getMonthDays)].map((_, index) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      index + 1
    );

    const day = state.days?.find((date) => {
      let d = new Date(date.date);

      return (
        d.getDate() === targetDate.getDate() &&
        d.getMonth() === targetDate.getMonth() &&
        d.getFullYear() === targetDate.getFullYear()
      );
    });

    const isDone = day?.done ?? false;
    const bgColor = isDone ? color || "palletPurple-400" : "palletGray-100";
    return (
      <div
        className={`w-4 h-4 rounded-[2px] bg-${bgColor} m-1`}
        key={index}
      ></div>
    );
  });
};
