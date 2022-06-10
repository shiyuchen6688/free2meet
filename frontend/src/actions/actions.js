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

// Handle change in meetup title and detial form input
export const changeMeetupTitleAndDetailForm = (inputValue, inputName) => {
    return {
        type: "CHANGE_MEETUP_TITLE_AND_DETAIL_FORM",
        payload: { inputValue, inputName }
    }
}

