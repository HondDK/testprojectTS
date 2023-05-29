import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQOneAnswerState } from "../types";

const initialState: IQOneAnswerState = {
  answerId: "",
  answer: "",
  selectedAnswer: [],
  buttonDisabled: [],
};

const QOneAnswerSlice = createSlice({
  name: "qOneAnswerSlice",
  initialState,
  reducers: {
    setAnswerId: (state, action: PayloadAction<string>) => {
      state.answerId = action.payload;
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload;
    },
    setSelectedAnswer: (state, action: PayloadAction<string[]>) => {
      state.selectedAnswer = action.payload;
    },
    setButtonDisabled: (state, action: PayloadAction<boolean[]>) => {
      state.buttonDisabled = action.payload;
    },
  },
});

export const { setAnswerId, setAnswer, setSelectedAnswer, setButtonDisabled } =
  QOneAnswerSlice.actions;
export default QOneAnswerSlice.reducer;
