const timeReducer = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_SCHEDULE":
            return action.newSchedule;
        default:
            return state;
    }
};

export default timeReducer;