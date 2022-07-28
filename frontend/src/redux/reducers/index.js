import { combineReducers } from "redux";
import createMeetupLocationReducer from "./createMeetupLocationReducer";
import createMeetupTitleDetailReducer from "./createMeetupTitleDetailReducer";
import createMeetupScheduleReducer from "./createMeetupScheduleReducer";
import createMeetupInvitationReducer from "./createMeetupInvitationReducer";
import createMeetupTagsReducer from "./createMeetupTagsReducer";
import meetupsReducer from "../meetups/reducer";
import usersReducer from "../users/reducer";
import invitationsReducer from "../invitations/reducer";


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