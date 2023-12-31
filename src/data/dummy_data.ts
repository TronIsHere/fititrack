import { TWorkout } from "@/types/workout";

export const missions = [
  { id: 1, title: "Cardio 10 miles", done: false },
  { id: 2, title: "Swimming 20 minutes", done: true },
];
export const workoutsData: TWorkout[] = [
  {
    id: 1,
    title: "upper body",
    checkIns: 3,
    created: new Date("2023/12/27"),
    streak: 2,
    done: false,
    days: [
      { date: new Date("2023/12/10"), done: false },
      { date: new Date("2023/12/14"), done: true },
      { date: new Date("2023/12/29"), done: true },
    ],
  },
  {
    id: 2,
    title: "lower body",
    checkIns: 1,
    created: new Date("2023/12/27"),
    streak: 0,
    done: false,
    days: [
      { date: new Date("2023/12/27"), done: false },
      { date: new Date("2023/12/28"), done: true },
      { date: new Date("2023/12/29"), done: false },
    ],
  },
];
