import { isSameDay } from "@/lib/dateUtils";
import {
  calculateConsistency,
  calculateStreak,
  capitalizeFirstLetter,
  cn,
} from "@/lib/utils";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { renderDoneIndicator } from "../ui/workout/done-indicator";
import { renderEditButtons } from "../ui/workout/edit-button";
import { renderDayGrid } from "../ui/workout/render-day-grid";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addXp } from "@/store/slices/userSlice";
import { updateSingleWorkout } from "@/store/slices/workoutSlice";
import { TWorkout } from "../types/workout";
interface workoutProps {
  workout: TWorkout;
  editEnabled?: boolean;
  opacity?: boolean;
  updateWorkout: (type: "edit" | "delete") => void;
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  workout,
  opacity,
  updateWorkout,
}) => {
  console.log(updateWorkout, 30);
  const { title }: TWorkout = workout;
  const [workoutState, setWorkoutState] = useState<TWorkout>(workout);
  const consistency = calculateConsistency(workoutState.days || []);
  const dispatch = useAppDispatch();

  const hasWorkout = !!workout;

  useEffect(() => {
    // checking if today doesn't exist add it so user can see the correct stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const currentDays = workoutState.days || []; // Current days from the state

    // Check if yesterday exists in the days array and is marked as done
    const yesterdayWasDone = currentDays.some(
      (day) => isSameDay(new Date(day.date), yesterday) && day.done
    );
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
        done: updatedDays[updatedDays.length - 1].done,
        days: updatedDays,
        streak: yesterdayWasDone ? prevState.streak : 0,
      }));
      const updatedWorkout: TWorkout = {
        ...workoutState,
        done: updatedDays[updatedDays.length - 1].done,
        days: updatedDays,
        streak: yesterdayWasDone ? workoutState.streak : 0,
      };
      dispatch(updateSingleWorkout({ id: workoutState.id, updatedWorkout }));
    }
  }, [workoutState.days, hasWorkout]);

  const handleWorkout = () => {
    setWorkoutState((prevState) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const currentDays = prevState.days || [];
      const existingDayIndex = currentDays.findIndex((d) =>
        isSameDay(new Date(d.date), today)
      );

      let updatedDays = [...currentDays];
      let updatedCheckIns = prevState.checkIns;
      let wasDone = false;

      // Check if the workout was done today and update accordingly
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

      // Only add XP if the workout was not already done
      if (!wasDone) {
        dispatch(addXp(20));
      }

      // Calculate the new streak
      const newStreak = calculateStreak(updatedDays);

      const newWorkoutData = {
        ...prevState, // Spread the previous state of the workout
        days: updatedDays, // Assign the updated days
        checkIns: updatedCheckIns, // Update the check-ins count
        done: !prevState.done, // Toggle the done state
        streak: newStreak, // New streak calculation
      };

      dispatch(
        updateSingleWorkout({
          id: prevState.id,
          updatedWorkout: newWorkoutData,
        })
      );

      return newWorkoutData;
    });
  };

  return (
    <div
      className={cn(
        "bg-white w-full rounded-xl p-5 mb-6 dark:bg-darkPrimary",
        opacity ? "opacity-90" : ""
      )}
    >
      <div className="flex justify-between">
        <span className=" pt-1 font-medium">
          {capitalizeFirstLetter(title)}
        </span>
        {editEnabled
          ? renderEditButtons(updateWorkout)
          : renderDoneIndicator(
              workoutState.done,
              handleWorkout,
              workout.color
            )}
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
            {renderDayGrid(workoutState, workout.color)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;
