import { TDay } from "./dashboardTypes";

export type TWorkout = {
  id: any;
  created?: string;
  title: string;
  streak: number;
  checkIns: number;
  done: boolean;
  muscles?: string[];
  type: "Strength" | "Cardio";
  duration?: number;
  color?: string;
  days?: TDay[];
};
export type UpdateWorkoutPayload = {
  id: number;
  updatedWorkout: TWorkout;
};
