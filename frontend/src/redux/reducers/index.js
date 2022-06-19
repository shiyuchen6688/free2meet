import { combineReducers } from "redux";
import createMeetupLocationReducer from "./createMeetupLocationReducer";
import createMeetupTitleDetailReducer from "./createMeetupTitleDetailReducer";
import createMeetupScheduleReducer from "./createMeetupScheduleReducer";
import meetupsReducer from "../meetups/reducer";
import usersReducer from "../users/reducer";

export default combineReducers({
    createMeetupLocationReducer,
    createMeetupTitleDetailReducer,
    createMeetupScheduleReducer,
    meetupsReducer,
    usersReducer
});