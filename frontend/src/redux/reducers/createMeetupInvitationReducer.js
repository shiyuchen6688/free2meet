const initialValue = {
    invitees: [],
    tags: [],
};

const createMeetupInvitationReducer = (state = initialValue, action) => {
    let stateCopy;
    switch (action.type) {
        case 'CHANGE_INVITEES':
            stateCopy = JSON.parse(JSON.stringify(state));
            return stateCopy.invitees = action.payload;
        case 'CHANGE_TAGS':
            stateCopy = JSON.parse(JSON.stringify(state));
            return stateCopy.tags = action.payload;
        default:
            return state;
    }
}

export default createMeetupInvitationReducer;