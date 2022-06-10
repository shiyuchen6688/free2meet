const reducers = (state = [], action) => {
    switch (action.type) {
        case "ADD_R":
            if (!state.some(e=> e.place_id === action.newPlace.place_id)){
                return [...state, action.newPlace];
            }
            return state;
        case "DEL_R":
            return state.filter((e) => { return e.place_id !== action.id });
        default:
            return state;
    }
};

export default reducers;