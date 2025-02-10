// combining all the reducers together into one.

import { combineReducers } from "redux";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;
