import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormPageState } from "../types";

const initialState: IFormPageState = {
  student_examId: "",
  id: "",
  user: {
    lastName: "",
    firstName: "",
    middleName: "",
  },
  isDisabled: false,
};

const formPageSlice = createSlice({
  name: "formPage",
  initialState,
  reducers: {
    setStudent_examId: (state, action: PayloadAction<string>) => {
      state.student_examId = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUser: (state, action: PayloadAction<IFormPageState["user"]>) => {
      state.user = action.payload;
    },
    setIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload;
    },
  },
});

export const { setStudent_examId, setId, setUser, setIsDisabled } =
  formPageSlice.actions;
export default formPageSlice.reducer;
