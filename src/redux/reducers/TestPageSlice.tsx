import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TestPageState} from "../types";


const initialState: TestPageState = {
    ex_name: ""
};

const testPageSlice = createSlice({
    name: "testPage",
    initialState,
    reducers: {
        setEx_name: (state, action: PayloadAction<string>) => {
            state.ex_name = action.payload;
        },

    },
});

export const { setEx_name} = testPageSlice.actions;
export default testPageSlice.reducer;
