import { combineReducers } from "redux";
import formPageReducer from "./reducers/FormPageSlice";

const rootReducer = combineReducers({
    formPage: formPageReducer,
});

export default rootReducer;