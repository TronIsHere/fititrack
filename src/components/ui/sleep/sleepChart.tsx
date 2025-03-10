import { useAppSelector } from "@/hooks/storeHooks";
import { getCurrentWeek } from "@/lib/dateUtils";
import { calculateTotalSleepPerDay, groupByDayOfWeek } from "@/lib/timeUtils";
import { FC, useMemo } from "react";
import SleepBar from "../sleepBar";

export const SleepChart: FC = () => {
  const { startOfWeek, endOfWeek } = getCurrentWeek();

  const sleepData = useAppSelector((state) => state.user.sleep);

  const filteredSleepData = useMemo(() => {
    return sleepData.filter((sleepEntry) => {
      const entryDate = new Date(sleepEntry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });
  }, [sleepData, startOfWeek, endOfWeek]); // Dependencies

  const groupedData = useMemo(
    () => groupByDayOfWeek(filteredSleepData),
    [filteredSleepData]
  );

  const maxSleepHour = 8;
  type DayOfWeek = keyof typeof groupedData;

  const sleepHoursByDay = useMemo(
    () =>
      (Object.keys(groupedData) as DayOfWeek[]).map((day) => ({
        day,
        sleepHours: calculateTotalSleepPerDay(groupedData[day]),
      })),
    [groupedData]
  );

  // const maxSleep = Math.max(
  //   ...sleepHoursByDay.map((dayData) => dayData.sleepHours)
  // );

  return (
    <div className="flex justify-center mx-0 md:mx-10 pt-4">
      {sleepHoursByDay.map((dayData) => {
        const sleepPercentage = Math.min(
          (dayData.sleepHours / maxSleepHour) * 100,
          100
        );
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
