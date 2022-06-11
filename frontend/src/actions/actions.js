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
