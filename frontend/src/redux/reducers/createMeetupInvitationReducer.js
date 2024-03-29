const initialValue = [];

const createMeetupInvitationReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_INVITEES':
            // get new input value + name of the form input
            return action.payload;
        case 'CLEAR_INVITEES':
            return initialValue
        default:
            return state
    }
}

export default createMeetupInvitationReducer;