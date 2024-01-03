import { TWorkout } from "@/components/types/dashboardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface WorkoutState {
  workouts: TWorkout[];
}

// Define the initial state using that type
const initialState: WorkoutState = {
  workouts: [
    {
      id: 1,
      title: "upper body",
      checkIns: 2,
      created: new Date("2023/12/27").toISOString(),
      streak: 2,
      done: false,
      days: [
        { date: new Date("2023/12/10").toISOString(), done: false },
        { date: new Date("2023/12/14").toISOString(), done: true },
        { date: new Date("2023/12/29").toISOString(), done: true },
      ],
    },
    {
      id: 2,
      title: "lower body",
      checkIns: 1,
      created: new Date("2023/12/27").toISOString(),
      streak: 1,
      done: false,
      days: [{ date: new Date("2023/12/30").toISOString(), done: true }],
    },
  ],
};

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    updateWorkout: (state, action: PayloadAction<TWorkout>) => {
      // Implementation to update a workout
    },
    addWorkout: (state, action: PayloadAction<TWorkout>) => {
      state.workouts.push(action.payload);
    },
    // Additional reducers can be added here
  },
});

export const { updateWorkout, addWorkout } = workoutSlice.actions;

// Selector
export const selectWorkouts = (state: RootState) => state.workout.workouts;

export default workoutSlice.reducer;
