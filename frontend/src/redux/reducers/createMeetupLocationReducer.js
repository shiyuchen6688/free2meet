const createMeetupLocationReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_LOCATION":
            if (!state.some(e => e.place_id === action.newPlace.place_id)) {
                return [...state, action.newPlace];
            }
            return state;
        case "DELETE_LOCATION":
            return state.filter((e) => { return e.place_id !== action.id });
        case 'CLEAR_LOCATION':
            return []
        default:
            return state;
    }
};

export default createMeetupLocationReducer;
