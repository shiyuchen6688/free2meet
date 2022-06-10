export const addR = (newPlace) => ({
    type: "ADD_R",
    newPlace
});

export const delR = id => ({
    type: "DEL_R",
    id
});

export const updateSchedule = (newSchedule) => ({
    type: "UPDATE_SCHEDULE",
    newSchedule
});