import { TWorkout } from "@/components/types/DataTypes";
import axios from "axios";

export const addWorkoutToServer = async (
  newWorkout: TWorkout,
  email: string
) => {
  const response = await axios.post("/api/user/add/workout", {
    email,
    workout: newWorkout,
  });
  return response.data;
};
export const deleteWorkoutFromServer = async (
  workoutId: number,
  email: string
) => {
  const response = await axios.post("/api/user/delete/workout", {
    email,
    workoutId,
  });
  return response.data;
};
export const updateWorkoutOnServer = async (
  id: number,
  email: string,
  updatedWorkout: any
) => {
  try {
    const response = await axios.patch("/api/user/update/workout", {
      workoutId: id,
      email, // assuming email is available in session
      updatedWorkout,
    });

    console.log("Workout updated:", response.data);
  } catch (error) {
    console.error("Error updating workout:", error);
  }
};
