import { TSleep } from "@/components/types/sleep";
import { TWeight } from "@/components/types/weight";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  darkMode: boolean;
  weight: TWeight[];
  age: number;
  sleep: TSleep[];
  level: number;
  maxXp: number;
  xp: number;
  name: string;
  lastName: string;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "erwin",
  lastName: "aghajani",
  darkMode: false,
  age: 20,
  sleep: [
    {
      date: new Date("2024/01/01").toISOString(),
      from: "09:00",
      to: "10:00",
    },
    {
      date: new Date("2024/01/02").toISOString(),
      from: "22:00",
      to: "05:00",
    },
  ],
  weight: [{ date: new Date("2023/12/04").toISOString(), weight: 20 }],
  level: 1,
  maxXp: 100,
  xp: 50,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
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
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const darkModeSelector = (state: RootState) => state.user.darkMode;

export default userSlice.reducer;
