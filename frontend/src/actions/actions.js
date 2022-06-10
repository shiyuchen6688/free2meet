// Add location
export const addLocation = (newPlace) => ({
    type: "ADD_LOCATION",
    newPlace
});

// Delete locations
export const deleteLocation = id => ({
    type: "DELETE_LOCATION",
    id
});