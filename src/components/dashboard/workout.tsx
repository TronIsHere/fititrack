import { isSameDay } from "@/lib/dateUtils";
import { calculateConsistency, calculateStreak } from "@/lib/utils";
import { TWorkout } from "@/types/dashboardTypes";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { renderDoneIndicator } from "../ui/workout/done-indicator";
import { renderEditButtons } from "../ui/workout/edit-button";
import { renderDayGrid } from "../ui/workout/render-day-grid";
interface workoutProps {
  workout: TWorkout;
  editEnabled?: boolean;
  updateWorkout: () => void;
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  workout,
  updateWorkout,
}) => {
  if (!workout) {
    return null;
  }

  const { title }: TWorkout = workout;
  const [workoutState, setWorkoutState] = useState<TWorkout>(workout);
  const consistency = calculateConsistency(workoutState.days || []);

  useEffect(() => {
    // checking if today doesn't exist add it so user can see the correct stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDays = workoutState.days || []; // Provide a default empty array
    const todayExists = currentDays.some((day) => isSameDay(day.date, today));

    if (!todayExists) {
      const updatedDays = [...currentDays, { date: today, done: false }];

      setWorkoutState((prevState) => ({
        ...prevState,
        days: updatedDays,
      }));
    }
  }, [workoutState.days]);

  const handleWorkout = () => {
    setWorkoutState((prevState) => {
      //doing streak and grid and checkIns in same function
      const today = new Date();
      const currentDays = prevState.days || [];
      const existingDayIndex = currentDays.findIndex((d) =>
        isSameDay(d.date, today)
      );

      let updatedDays = [...currentDays];
      let updatedCheckIns = prevState.checkIns;

      if (existingDayIndex >= 0) {
        const wasDone = updatedDays[existingDayIndex].done;
        updatedDays[existingDayIndex] = {
          ...updatedDays[existingDayIndex],
          done: !wasDone,
        };
        updatedCheckIns += wasDone ? -1 : 1;
      } else {
        updatedDays.push({ date: today, done: true });
        updatedCheckIns++;
      }

      return {
        ...prevState,
        days: updatedDays,
        checkIns: updatedCheckIns,
        done: !workoutState.done,
        streak: calculateStreak(updatedDays),
      };
    });
  };

  return (
    <div className="bg-white w-full rounded-xl p-5 mb-6 dark:bg-darkPrimary">
      <div className="flex justify-between">
        <span className=" pt-1 font-medium">{title}</span>
        {editEnabled
          ? renderEditButtons()
          : renderDoneIndicator(workoutState.done, handleWorkout)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full my-8 mb-3">
        <div className="col-span-1 flex flex-col items-start md:items-center">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">
              {consistency.toFixed(0)}
            </span>
            <span className="text-palletGray-200">%</span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Consistency
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-start md:items-center">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">
              {workoutState.streak}
            </span>
            <span className="text-palletGray-200">days</span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Streak
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-start md:items-center my-5 md:my-0">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">
              {workoutState.checkIns}
            </span>
            <span className="text-palletGray-200"></span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Check-ins
          </span>
        </div>
        <div className="col-span-2 flex flex-col w-full items-center justify-end">
          <div className="flex justify-start mx-8 flex-wrap">
            {renderDayGrid(workoutState)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;
