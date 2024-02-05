import { checkDayDone, checkDayExistence, isSameDay } from "@/lib/dateUtils";
import {
  calculateConsistency,
  calculateStreak,
  capitalizeFirstLetter,
  cn,
} from "@/lib/utils";

import { useAppDispatch } from "@/hooks/storeHooks";
import { addXPToServer } from "@/services/user";
import { addXp } from "@/store/slices/userSlice";
import { updateSingleWorkout } from "@/store/slices/workoutSlice";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { TWorkout } from "../types/DataTypes";
import { renderDoneIndicator } from "../ui/workout/done-indicator";
import { renderEditButtons } from "../ui/workout/edit-button";
import { renderDayGrid } from "../ui/workout/render-day-grid";
import moment from "moment";
import { useWorkoutUpdater } from "@/hooks/workout/useWorkoutUpdater";
import { updateWorkoutOnServer } from "@/services/workout";

interface workoutProps {
  workout: TWorkout;
  session: any;
  editEnabled?: boolean;
  opacity?: boolean;
  updateWorkout: (type: "edit" | "delete") => void;
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  session,
  workout,
  opacity,
  updateWorkout,
}) => {
  const { title }: TWorkout = workout;
  const [workoutState, setWorkoutState] = useState<TWorkout>(workout);
  const consistency = calculateConsistency(workoutState.days || []);
  const dispatch = useAppDispatch();
  const hasWorkout = !!workout;
  const updateWorkoutState = useWorkoutUpdater(workoutState);
  useEffect(() => {
    const today = moment().startOf("day");
    const yesterday = moment(today).subtract(1, "day");

    const currentDays = workoutState.days || [];

    // Check if yesterday exists in the days array and is marked as done
    const yesterdayWasDone = checkDayDone(currentDays, yesterday.toDate());
    const todayExists = checkDayExistence(currentDays, today.toDate());

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
      updateWorkoutState(updatedDays, yesterdayWasDone);
    }
  }, [workoutState.days, hasWorkout]);
  // useEffect(() => {
  //   const performAsyncOperation = async () => {
  //     if (workoutState && session.data?.user?.email) {
  //       try {
  //         await updateWorkoutOnServer(
  //           workoutState._id,
  //           session.data.user.email,
  //           workoutState
  //         );

  //         dispatch(
  //           updateSingleWorkout({
  //             id: workoutState._id,
  //             updatedWorkout: workoutState,
  //           })
  //         );
  //       } catch (error) {
  //         console.error("Error updating workout:", error);
  //       }
  //     }
  //   };
  //   performAsyncOperation();
  // }, [workoutState, session.data?.user?.email, dispatch]);
  const handleWorkout = async () => {
    setWorkoutState((prevState) => {
      const today = moment().startOf("day");

      const currentDays = prevState.days || [];
      const existingDayIndex = currentDays.findIndex((d) =>
        isSameDay(new Date(d.date), today.toDate())
      );

      const updatedDays = [...currentDays];
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

      // Only add XP if the workout was not already done
      if (!wasDone && session.data?.user?.email) {
        addXPToServer(20, session.data.user.email);
        dispatch(addXp(20));
      }

      const newStreak = calculateStreak(updatedDays);

      const newWorkoutData = {
        ...prevState,
        days: updatedDays,
        checkIns: updatedCheckIns,
        done: !prevState.done,
        streak: newStreak,
      };

      return newWorkoutData;
    });
    if (workoutState && session.data?.user?.email) {
      try {
        await updateWorkoutOnServer(
          workoutState._id, // make sure this is the correct ID
          session.data.user.email,
          workoutState // Assuming this is the updated state you want to send
        );

        // Optional: Dispatch an action if needed
        dispatch(
          updateSingleWorkout({
            id: workoutState._id,
            updatedWorkout: workoutState,
          })
        );
      } catch (error) {
        console.error("Error updating workout:", error);
        // Handle the error appropriately
      }
    }
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
