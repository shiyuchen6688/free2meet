const initialValue = {};

const invitationsCardsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'UPDATE_INVITATIONS_LOCATIONS':
            // get new input value + name of the form input
            console.log(action.payload);
            return action.payload;
        default:
            return state
    }
}

export default invitationsCardsReducer;