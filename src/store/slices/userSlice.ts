import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

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
  xp: 0,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    newWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
    levelUp: (state, action: PayloadAction<number>) => {
      state.level = ++state.level;
    },
    changeMaxXp: (state, action: PayloadAction<number>) => {
      state.maxXp = action.payload;
    },
    addXp: (state, action: PayloadAction<number>) => {
      state.xp = state.xp + action.payload;
    },
  },
});

export const { toggleDarkMode, newWeight, levelUp, changeMaxXp, addXp } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeCount = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
