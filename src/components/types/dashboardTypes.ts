export type TWorkout = {
  id?: any;
  created?: string;
  title: string;
  streak: number;
  checkIns: number;
  done: boolean;
  days?: TDay[];
};
export type TDay = {
  date: string;
  done: boolean;
};
export type Theme = "Light" | "Auto" | "Dark";
