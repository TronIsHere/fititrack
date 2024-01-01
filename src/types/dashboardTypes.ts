export type TWorkout = {
  id?: any;
  created?: any;
  title: string;
  streak: number;
  checkIns: number;
  done: boolean;
  days?: TDay[];
};
export type TDay = {
  date: Date;
  done: boolean;
};
