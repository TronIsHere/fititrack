import { TSleep, TWeight } from "@/components/types/DataTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  name: string | null;
  darkMode: boolean;
  dob: string | null;
  email: string | null;
  sleep: Array<{
    date: string;
    from: string;
    to: string;
  }>;
  weight: Array<{
    date: string;
    weight: number;
  }>;
  level: number;
  maxXp: number;
  xp: number;
  initialized: boolean;
}
// // Define the initial state using that type
// const initialState: UserState = {
//   name: "erwin aghajani",
//   darkMode: false,
//   dob: "2000-02-20",
//   email: "erwin.aghajani@gmail.com",
//   sleep: [
//     {
//       date: new Date("2024/01/01").toISOString(),
//       from: "09:00",
//       to: "10:00",
//     },
//     {
//       date: new Date("2024/01/02").toISOString(),
//       from: "22:00",
//       to: "05:00",
//     },
//   ],
//   weight: [],
//   level: 1,
//   maxXp: 100,
//   xp: 50,
// };
const initialState: UserState = {
  name: null, // Initial state as null, to be populated after user login/fetch
  darkMode: false, // Default theme mode
  dob: null, // Date of Birth is initially null
  email: null, // Email is initially null
  sleep: [], // Sleep data starts as an empty array
  weight: [], // Weight data starts as an empty array
  level: 1, // Starting level
  maxXp: 100, // Initial max XP value
  xp: 0, // Start with 0 XP
  initialized: false,
};
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeDob: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearCharacter: (state) => {
      //TODO: for debug
      state.xp = 0;
      state.level = 1;
      state.maxXp = 100;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    changeDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    newWeight: (state, action: PayloadAction<TWeight>) => {
      state.weight.push(action.payload);
    },
    newSleep: (state, action: PayloadAction<TSleep>) => {
      state.sleep.push(action.payload);
    },
    logout: (state) => {
      return initialState;
    },
    levelUp: (state) => {
      state.level = ++state.level;
    },
    changeMaxXp: (state, action: PayloadAction<number>) => {
      state.maxXp = action.payload;
    },
    addXp: (state, action: PayloadAction<number>) => {
      state.xp = state.xp + action.payload;
      if (state.xp >= state.maxXp) {
        state.level += 1;

        // Gradually increase maxXp in a controlled manner
        const increaseFactor = 2; // Adjust this factor to control the growth rate
        const randomness = 0.3; // Maximum percentage of randomness
        const randomAdjustment =
          1 + Math.random() * randomness - randomness / 2;

        state.maxXp = Math.floor(
          state.maxXp * increaseFactor * randomAdjustment
        );

        state.xp = 0;
      }
    },
  },
});

export const {
  toggleDarkMode,
  changeDarkMode,
  newWeight,
  levelUp,
  changeMaxXp,
  addXp,
  newSleep,
  clearCharacter,
  changeName,
  changeDob,
  changeEmail,
  initData,
  logout,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeSelector = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
