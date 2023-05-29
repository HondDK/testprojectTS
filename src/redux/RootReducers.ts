import { combineReducers } from "redux";
import formPageReducer from "./reducers/FormPageSlice";
import testPageReducer from "./reducers/TestPageSlice";
import TimerReducer from "./reducers/TimerSlice";
import QOneAnswerReducer from "./reducers/QOneAnswerSlice";
import QInputAnswerReducer from "./reducers/QInputAnswerSlice";

const rootReducer = combineReducers({
  formPage: formPageReducer,
  testPage: testPageReducer,
  timer: TimerReducer,
  qOneAnswer: QOneAnswerReducer,
  qInputAnswer: QInputAnswerReducer,
});

export default rootReducer;
