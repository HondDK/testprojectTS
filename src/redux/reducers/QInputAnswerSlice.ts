import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQInputAnswerState } from "../types";

const initialState: IQInputAnswerState = {
  answerId: 0,
  answer: "",
  buttonDisabled: [],
};

const QInputAnswerSlice = createSlice({
  name: "QInputAnswerSlice",
  initialState,
  reducers: {
    setAnswerId: (state, action: PayloadAction<number>) => {
      state.answerId = action.payload;
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload;
    },
    setButtonDisabled: (state, action: PayloadAction<boolean[]>) => {
      state.buttonDisabled = action.payload;
    },
  },
});

export const { setAnswerId, setAnswer, setButtonDisabled } =
  QInputAnswerSlice.actions;
export default QInputAnswerSlice.reducer;
