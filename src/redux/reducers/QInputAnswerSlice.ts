import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQInputAnswerState } from "../types";

const initialState: IQInputAnswerState = {
  answerId: "",
  answer: [],
  buttonDisabled: [],
};

const QInputAnswerSlice = createSlice({
  name: "QInputAnswerSlice",
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
  QInputAnswerSlice.actions;
export default QInputAnswerSlice.reducer;
