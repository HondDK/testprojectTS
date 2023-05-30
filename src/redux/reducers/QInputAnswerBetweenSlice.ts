import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQInputBetweenAnswerState } from "../types";

const initialState: IQInputBetweenAnswerState = {
  answerId: "",
  answer: [],
  buttonDisabled: [],
};

const QInputAnswerBetweenSlice = createSlice({
  name: "QInputAnswerBetween",
  initialState,
  reducers: {
    setAnswerId: (state, action: PayloadAction<string>) => {
      state.answerId = action.payload;
    },
    setAnswer: (
      state,
      action: PayloadAction<{ answerId: number; answer: string }>
    ) => {
      const { answerId, answer } = action.payload;
      state.answer[answerId] = answer;
    },
    setButtonDisabled: (state, action: PayloadAction<boolean[]>) => {
      state.buttonDisabled = action.payload;
    },
  },
});

export const { setAnswerId, setAnswer, setButtonDisabled } =
  QInputAnswerBetweenSlice.actions;
export default QInputAnswerBetweenSlice.reducer;
