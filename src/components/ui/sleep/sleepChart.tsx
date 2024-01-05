import { TSleep } from "@/components/types/sleep";
import { useAppSelector } from "@/hooks/storeHooks";
import { calculateTotalSleepPerDay, groupByDayOfWeek } from "@/lib/timeUtils";
import { FC } from "react";
import SleepBar from "../sleepBar";

export const SleepChart: FC = () => {
  // Adjust according to your Redux setup
  const sleepData = useAppSelector((state) => state.user.sleep);
  const groupedData = groupByDayOfWeek(sleepData);
  console.log(groupedData);
  type DayOfWeek = keyof typeof groupedData;
  const sleepHoursByDay = (Object.keys(groupedData) as DayOfWeek[]).map(
    (day) => ({
      day,
      sleepHours: calculateTotalSleepPerDay(groupedData[day]),
    })
  );

  // const maxSleep = Math.max(
  //   ...sleepHoursByDay.map((dayData) => dayData.sleepHours)
  // );

  return (
    <div className="flex justify-center mx-0 md:mx-10 pt-4">
      {sleepHoursByDay.map((dayData) => {
        const sleepPercentage = Math.min((dayData.sleepHours / 8) * 100, 100);
        return (
          <div
            key={dayData.day}
            className="flex flex-col items-center w-10 font-light text-sm"
          >
            <SleepBar
              value={sleepPercentage}
              indicatorColor={"#7B78EB"}
              day={dayData.day}
            />
          </div>
        );
      })}
    </div>
  );
};
