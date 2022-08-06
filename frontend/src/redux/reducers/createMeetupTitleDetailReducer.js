const initialValue = {
    "meetup-title": "",
    "meetup-description": ""
}

const createMeetupTitleDetailReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_MEETUP_TITLE_AND_DETAIL_FORM':
            // get new input value + name of the form input
            const { inputValue, inputName } = action.payload;
            return {
                ...state,
                [inputName]: inputValue
            };
        case 'CLEAR_MEETUP_TITLE_AND_DETAIL_FORM':
            return initialValue
        default:
            return state
    }
}

export default createMeetupTitleDetailReducer;