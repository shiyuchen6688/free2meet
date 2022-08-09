const initialValue = [];

const createMeetupTagsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_TAGS':
            return action.payload;
        case 'CLEAR_TAGS':
            return initialValue
        default:
            return state
    }
}

export default createMeetupTagsReducer;