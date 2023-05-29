import { combineReducers } from "redux";
import formPageReducer from "./reducers/FormPageSlice";
import testPageReducer from "./reducers/TestPageSlice"

const rootReducer = combineReducers({
    formPage: formPageReducer,
    testPage: testPageReducer,
});

export default rootReducer;