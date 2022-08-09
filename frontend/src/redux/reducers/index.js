import { combineReducers } from "redux";
import invitationsReducer from "../invitations/reducer";
import meetupsReducer from "../meetups/reducer";
import usersReducer from "../users/reducer";
import createMeetupInvitationReducer from "./createMeetupInvitationReducer";
import createMeetupLocationReducer from "./createMeetupLocationReducer";
import createMeetupScheduleReducer from "./createMeetupScheduleReducer";
import createMeetupTagsReducer from "./createMeetupTagsReducer";
import createMeetupTitleDetailReducer from "./createMeetupTitleDetailReducer";

export default combineReducers({
    createMeetupLocationReducer,
    createMeetupTitleDetailReducer,
    createMeetupScheduleReducer,
    createMeetupInvitationReducer,
    createMeetupTagsReducer,
    invitationsReducer,
    meetupsReducer,
    usersReducer
});