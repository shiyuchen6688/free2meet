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

export const updateSchedule = (newSchedule) => ({
    type: "UPDATE_SCHEDULE",
    newSchedule
});

export const updateTimezone = (newTimezone) => ({
    type: "UPDATE_TIMEZONE",
    newTimezone
});

export const updateStartDate = (newStartDate) => ({
    type: "UPDATE_START_DATE",
    newStartDate
});

export const updateSelectionScheme = (newSelectionScheme) => ({
    type: "UPDATE_SELECTION_SCHEME",
    newSelectionScheme
});

export const updateNumDaysInput = (newNumDaysInput) => ({
    type: "UPDATE_NUM_DAYS_INPUT",
    newNumDaysInput
});

export const updateNumDays = (newNumDays) => ({
    type: "UPDATE_NUM_DAYS",
    newNumDays
});

export const updateHourlyChunkInput = (newHourlyChunkInput) => ({
    type: "UPDATE_HOURLY_CHUNK_INPUT",
    newHourlyChunkInput
});

export const updateHourlyChunk = (newHourlyChunk) => ({
    type: "UPDATE_HOURLY_CHUNK",
    newHourlyChunk
});

export const updateTimeInterval = (newTimeInterval) => ({
    type: "UPDATE_TIME_INTERVAL",
    newTimeInterval
});

export const clearSchedule = () => ({
    type: "CLEAR_SCHEDULE"
});

// Handle change in meetup title and detial form input
export const changeMeetupTitleAndDetailForm = (inputValue, inputName) => {
    return {
        type: "CHANGE_MEETUP_TITLE_AND_DETAIL_FORM",
        payload: { inputValue, inputName }
    }
};

// Change invitees in meetup invitation page
export const changeInvitee = (invitees) => {
    return {
        type: "CHANGE_INVITEES",
        payload: invitees
    }
};
