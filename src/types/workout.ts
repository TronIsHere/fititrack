export type TWorkout = {
  id?: any;
  created?: any;
  title: string;
  streak: number;
  checkIns: number;
  done: boolean;
  days?: { date: Date; done: boolean }[];
};
