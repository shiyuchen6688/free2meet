// Add a location
export const addLocation = (newPlace) => ({
    type: "ADD_LOCATION",
    newPlace
});

// Remove a location
export const deleteLocation = id => ({
    type: "DELETE_LOCATION",
    id
});

// Clear all locations
export const clearLocation = id => ({
    type: "CLEAR_LOCATION"
});

// Update the schedule
export const updateSchedule = (newSchedule) => ({
    type: "UPDATE_SCHEDULE",
    newSchedule
});

// Update the time zone
export const updateTimezone = (newTimezone) => ({
    type: "UPDATE_TIMEZONE",
    newTimezone
});

// update the start date
export const updateStartDate = (newStartDate) => ({
    type: "UPDATE_START_DATE",
    newStartDate
});

// update the selection scheme
export const updateSelectionScheme = (newSelectionScheme) => ({
    type: "UPDATE_SELECTION_SCHEME",
    newSelectionScheme
});

// update the number of days input
export const updateNumDaysInput = (newNumDaysInput) => ({
    type: "UPDATE_NUM_DAYS_INPUT",
    newNumDaysInput
});

// update the number of days
export const updateNumDays = (newNumDays) => ({
    type: "UPDATE_NUM_DAYS",
    newNumDays
});

// update the hourly chunk input
export const updateHourlyChunkInput = (newHourlyChunkInput) => ({
    type: "UPDATE_HOURLY_CHUNK_INPUT",
    newHourlyChunkInput
});

// update the hourly chunk
export const updateHourlyChunk = (newHourlyChunk) => ({
    type: "UPDATE_HOURLY_CHUNK",
    newHourlyChunk
});

// update the time interval
export const updateTimeInterval = (newTimeInterval) => ({
    type: "UPDATE_TIME_INTERVAL",
    newTimeInterval
});

// clear the schedule
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

// clear meetup title and detial
export const clearMeetupTitleAndDetailForm = () => {
    return {
        type: "CLEAR_MEETUP_TITLE_AND_DETAIL_FORM"
    }
}

// Change invitees in meetup invitation page
export const changeInvitee = (invitees) => {
    return {
        type: "CHANGE_INVITEES",
        payload: invitees
    }
};

export const clearInvitee = () => {
    return {
        type: "CLEAR_INVITEES"
    }
}

// Change tags in meetup invitation page
export const changeTags = (tags) => {
    return {
        type: "CHANGE_TAGS",
        payload: tags
    }
}

export const clearTags = () => {
    return {
        type: "CLEAR_TAGS"
    }
}
