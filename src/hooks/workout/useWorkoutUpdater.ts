// useWorkoutUpdater.js
import { TDay, TWorkout } from "@/components/types/DataTypes";
import { updateSingleWorkout } from "@/store/slices/workoutSlice";
import { useDispatch } from "react-redux";

export const useWorkoutUpdater = (workoutState: TWorkout) => {
  const dispatch = useDispatch();

  const updateWorkoutState = (
    updatedDays: TDay[],
    yesterdayWasDone: boolean
  ) => {
    const updatedWorkout = {
      ...workoutState,
      done: updatedDays[updatedDays.length - 1].done,
      days: updatedDays,
      streak: yesterdayWasDone ? workoutState.streak : 0,
    };

    dispatch(updateSingleWorkout({ id: workoutState.id, updatedWorkout }));
  };

  return updateWorkoutState;
};
