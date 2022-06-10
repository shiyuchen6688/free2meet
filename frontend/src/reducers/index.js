import { combineReducers } from "redux";
import createMeetupLocationReducer from "./createMeetupLocationReducer";
import createMeetupTitleDetailReducer from "./createMeetupTitleDetailReducer";

export default combineReducers({
    createMeetupLocationReducer,
    createMeetupTitleDetailReducer
});