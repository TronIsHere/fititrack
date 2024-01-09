import { TMission, TWorkout } from "@/components/types/dashboardTypes";

// In your dummy_data file

export const missions_dummy: TMission[] = [
  { id: 1, title: "Cardio 10 miles", done: false },
  { id: 2, title: "Swimming 20 minutes", done: true },
  { id: 3, title: "Yoga 30 minutes", done: false },
  { id: 4, title: "Cycling 15 miles", done: false },
  { id: 5, title: "Hiking 5 miles", done: false },
  { id: 6, title: "Weight Training 1 hour", done: false },
  { id: 7, title: "Running 3 miles", done: false },
  { id: 8, title: "Pilates 45 minutes", done: false },
  { id: 9, title: "Kickboxing 30 minutes", done: false },
  { id: 10, title: "Dance 1 hour", done: false },
  { id: 11, title: "CrossFit 1 hour", done: false },
  { id: 12, title: "Rowing 2 miles", done: false },
];

export const workoutsData: TWorkout[] = [
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
];
