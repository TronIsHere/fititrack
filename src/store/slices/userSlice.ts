import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// Define a type for the slice state
interface UserState {
  darkMode: boolean;
  weight: number;
}

// Define the initial state using that type
const initialState: UserState = {
  darkMode: false,
  weight: 80,
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
  },
});

export const { toggleDarkMode, newWeight } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeCount = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
