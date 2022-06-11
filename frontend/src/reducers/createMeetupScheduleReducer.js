const initState = {
    schedule: [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startDate: new Date(),
    selectionScheme: 'linear',
    numDaysInput: 7,
    numDays: 7,
    hourlyChunkInput: 1,
    hourlyChunk: 1,
    timeInterval: [8, 18],
};

const createMeetupScheduleReducer = (state = initState, action) => {
    let newState = {...state};
    switch (action.type) {
        case "UPDATE_SCHEDULE":
            newState.schedule = action.newSchedule;
            return newState;
        case "CLEAR_SCHEDULE":
            newState.schedule = [];
            return newState;
        case "UPDATE_TIMEZONE":
            newState.timezone = action.newTimezone;
            return newState;
        case "UPDATE_SELECTION_SCHEME":
            newState.selectionScheme = action.newSelectionScheme;
            return newState;
        case "UPDATE_NUM_DAYS_INPUT":
            newState.numDaysInput = action.newNumDaysInput;
            return newState;
        case "UPDATE_HOURLY_CHUNK_INPUT":
            newState.hourlyChunkInput = action.newHourlyChunkInput;
            return newState;
        case "UPDATE_HOURLY_CHUNK":
            newState.schedule = [];
            newState.hourlyChunk = action.newHourlyChunk;
            return newState;
        case "UPDATE_TIME_INTERVAL":
            newState.timeInterval = action.newTimeInterval;
            return newState;    
        case "UPDATE_NUM_DAYS":
            newState.schedule = [];
            newState.numDays = action.newNumDays;
            return newState;
        case "UPDATE_START_DATE":
            newState.schedule = [];
            newState.startDate = action.newStartDate;
            return newState;
        default:
            return state;
    }
};

export default createMeetupScheduleReducer;