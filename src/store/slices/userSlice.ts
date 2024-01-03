import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  darkMode: boolean;
  weight: number;
  level: number;
  maxXp: number;
  xp: number;
}

// Define the initial state using that type
const initialState: UserState = {
  darkMode: false,
  weight: 80,
  level: 1,
  maxXp: 100,
  xp: 50,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    changeDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    newWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
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
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeSelector = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
