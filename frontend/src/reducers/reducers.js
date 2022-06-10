const reducers = (state = [], action) => {
    switch (action.type) {
        case "ADD_R":
            return [...state, action.newPlace];
        case "DEL_R":
            return state.filter((e) => { return e.place_id !== action.id });
        default:
            return state;
    }
};

export default reducers;