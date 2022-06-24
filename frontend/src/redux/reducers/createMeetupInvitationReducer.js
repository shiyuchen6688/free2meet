const initialValue = [];

const createMeetupInvitationReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_INVITEES':
            // get new input value + name of the form input
            console.log(action.payload);
            return action.payload;
        default:
            return state
    }
}

export default createMeetupInvitationReducer;