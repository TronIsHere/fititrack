import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  darkMode: false,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeCount = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
