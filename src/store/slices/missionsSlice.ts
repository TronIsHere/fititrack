import { TMission } from "@/components/types/dashboardTypes";
import { getWeekStartDate } from "@/lib/dateUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MissionState {
  missions: TMission[];
  visibleMissions: number[]; // IDs of currently visible missions
  weekStart: string; // Date when the current set of missions started
}
const initialMission = [
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
// Define the initial state using that type
const initialState: MissionState = {
  missions: initialMission,
  visibleMissions: [],
  weekStart: getWeekStartDate(),
};

export const missionSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    toggleMission: (state, action: PayloadAction<number>) => {
      const mission = state.missions.find((m) => m.id === action.payload);
      if (mission) {
        mission.done = !mission.done;
      }
    },
    updateWeeklyMissions: (state) => {
      const currentWeekStart = getWeekStartDate();

      if (state.weekStart !== currentWeekStart) {
        const newMissions = state.missions
          .filter((m) => !state.visibleMissions.includes(m.id))
          .slice(0, 3)
          .map((m) => m.id);

        state.visibleMissions.push(...newMissions);
        state.weekStart = currentWeekStart;
      }
    },
  },
});

export const { toggleMission, updateWeeklyMissions } = missionSlice.actions;

// Selector
export const selectMissions = (state: RootState) => state.mission.missions;

export default missionSlice.reducer;
