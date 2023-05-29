import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITimerState } from "../types";

const initialState: ITimerState = {
  hoursToPass: 0,
  minutesToPass: 0,
  secondsToPass: 0,
  initialDataLoaded: false,
};

const TimerSlice = createSlice({
  name: "timerSlice",
  initialState,
  reducers: {
    setHoursToPass: (state, action: PayloadAction<number>) => {
      state.hoursToPass = action.payload;
    },
    setMinutesToPass: (state, action: PayloadAction<number>) => {
      state.minutesToPass = action.payload;
    },
    setSecondsToPass: (state, action: PayloadAction<number>) => {
      state.secondsToPass = action.payload;
    },
    setInitialDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.initialDataLoaded = action.payload;
    },
  },
});

export const {
  setHoursToPass,
  setMinutesToPass,
  setSecondsToPass,
  setInitialDataLoaded,
} = TimerSlice.actions;

export default TimerSlice.reducer;
