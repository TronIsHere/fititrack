import { isSameDay } from "@/lib/dateUtils";
import {
  calculateConsistency,
  calculateStreak,
  capitalizeFirstLetter,
} from "@/lib/utils";
import { TWorkout } from "@/components/types/dashboardTypes";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { renderDoneIndicator } from "../ui/workout/done-indicator";
import { renderEditButtons } from "../ui/workout/edit-button";
import { renderDayGrid } from "../ui/workout/render-day-grid";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addXp } from "@/store/slices/userSlice";
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
  const { title }: TWorkout = workout;
  const [workoutState, setWorkoutState] = useState<TWorkout>(workout);
  const consistency = calculateConsistency(workoutState.days || []);
  const dispatch = useAppDispatch();

  const hasWorkout = !!workout;

  useEffect(() => {
    // checking if today doesn't exist add it so user can see the correct stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDays = workoutState.days || []; // Provide a default empty array
    const todayExists = currentDays.some((day) =>
      isSameDay(new Date(day.date), today)
    );

    if (!todayExists) {
      const updatedDays = [
        ...currentDays,
        { date: today.toISOString(), done: false },
      ];

      setWorkoutState((prevState) => ({
        ...prevState,
        days: updatedDays,
      }));
    }
  }, [workoutState.days, hasWorkout]);

  const handleWorkout = () => {
    setWorkoutState((prevState) => {
      //doing streak and grid and checkIns in same function
      const today = new Date();
      const currentDays = prevState.days || [];
      const existingDayIndex = currentDays.findIndex((d) =>
        isSameDay(new Date(d.date), today)
      );

      let updatedDays = [...currentDays];
      let updatedCheckIns = prevState.checkIns;
      let wasDone = false;
      if (existingDayIndex >= 0) {
        wasDone = updatedDays[existingDayIndex].done;
        updatedDays[existingDayIndex] = {
          ...updatedDays[existingDayIndex],
          done: !wasDone,
        };
        updatedCheckIns += wasDone ? -1 : 1;
      } else {
        updatedDays.push({ date: today.toISOString(), done: true });
        updatedCheckIns++;
      }
      if (!wasDone) {
        dispatch(addXp(20)); // Only add XP if the workout was not already done
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
        <span className=" pt-1 font-medium">
          {capitalizeFirstLetter(title)}
        </span>
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
