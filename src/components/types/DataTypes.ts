export type TWeight = {
  date: string;
  weight: number;
};
export type TSleep = {
  date: string;
  from: string;
  to: string;
};
export type TWorkout = {
  _id?: any;
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

export type TMission = {
  id: any;
  title: string;
  done: boolean;
};
export type TDay = {
  date: string;
  done: boolean;
};
