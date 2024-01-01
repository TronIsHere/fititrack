import { TWorkout } from "@/types/dashboardTypes";

export const missions = [
  { id: 1, title: "Cardio 10 miles", done: false },
  { id: 2, title: "Swimming 20 minutes", done: true },
];
export const workoutsData: TWorkout[] = [
  {
    id: 1,
    title: "upper body",
    checkIns: 2,
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
    streak: 1,
    done: false,
    days: [{ date: new Date("2023/12/30"), done: true }],
  },
];
