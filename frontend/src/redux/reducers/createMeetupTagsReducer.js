const initialValue = [];

const createMeetupTagsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_TAGS':
            console.log(action.payload);
            return action.payload;
        default:
            return state
    }
}

export default createMeetupTagsReducer;