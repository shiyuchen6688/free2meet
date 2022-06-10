import { combineReducers } from "redux";
import locReducer from "./locReducer";
import timeReducer from "./timeReducer";

export default combineReducers({
    locReducer,
    timeReducer
});