import { combineReducers } from "redux";
import createMeetupLocationReducer from "./createMeetupLocationReducer";
import createMeetupTitleDetailReducer from "./createMeetupTitleDetailReducer";
import createMeetupScheduleReducer from "./createMeetupScheduleReducer";
import createMeetupInvitationReducer from "./createMeetupInvitationReducer";
import meetupsReducer from "../meetups/reducer";
import usersReducer from "../users/reducer";
import invitationsReducer from "./invitationsReducer";

export default combineReducers({
    createMeetupLocationReducer,
    createMeetupTitleDetailReducer,
    createMeetupScheduleReducer,
    createMeetupInvitationReducer,
    meetupsReducer,
    usersReducer
});