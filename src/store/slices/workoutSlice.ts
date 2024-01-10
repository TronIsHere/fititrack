import { TWorkout, UpdateWorkoutPayload } from "@/components/types/workout";
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
      checkIns: 0,
      created: new Date("2023/12/27").toISOString(),
      streak: 0,
      done: false,
      days: [],
      type: "Cardio",
    },
    {
      id: 2,
      title: "lower body",
      checkIns: 1,
      created: new Date("2023/12/27").toISOString(),
      streak: 0,
      done: false,
      days: [{ date: new Date("2023/12/30").toISOString(), done: true }],
      type: "Strength",
    },
  ],
};

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    updateWorkout: (state, action: PayloadAction<TWorkout[]>) => {
      state.workouts = action.payload;
      // Implementation to update a workout
    },
    updateSingleWorkout: (
      state,
      action: PayloadAction<UpdateWorkoutPayload>
    ) => {
      const { id, updatedWorkout } = action.payload;
      const index = state.workouts.findIndex((workout) => workout.id === id);
      if (index !== -1) {
        state.workouts[index] = updatedWorkout;
      }
      // Implementation to update a workout
    },
    addWorkout: (state, action: PayloadAction<TWorkout>) => {
      state.workouts.push(action.payload);
    },
    // Additional reducers can be added here
  },
});

export const { updateWorkout, addWorkout, updateSingleWorkout } =
  workoutSlice.actions;

// Selector
export const selectWorkouts = (state: RootState) => state.workout.workouts;

export default workoutSlice.reducer;
