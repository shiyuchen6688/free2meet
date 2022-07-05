import * as React from 'react';
import {
    Button, MenuItem, Slider, Stack,
    TextField, Typography, useMediaQuery
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ScheduleSelector from 'react-schedule-selector';
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useDispatch, useSelector } from 'react-redux';
import {
    updateSchedule, updateHourlyChunk, updateHourlyChunkInput,
    updateNumDays, updateNumDaysInput, updateStartDate, clearSchedule,
    updateSelectionScheme, updateTimezone, updateTimeInterval
} from '../redux/actions/actions';

export default function MeetupAvailability() {
    const dispatch = useDispatch();
    const allScheduleInfo = useSelector(state => state.createMeetupScheduleReducer);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // load PST timezone by default
    React.useEffect(() => {
        if (typeof (allScheduleInfo.timezone) === "string") {
            dispatch(updateTimezone({
                value: 'America/Dawson',
                label: '(GMT-7:00) Dawson, Yukon',
                offset: -7
            }));
        }
    }, []);
    return (
        <React.Fragment>
            <Stack direction="column" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <TextField
                            select
                            label="Selection Scheme"
                            value={allScheduleInfo.selectionScheme}
                            onChange={(newSelectionScheme) => {
                                dispatch(updateSelectionScheme(newSelectionScheme.target.value));
                            }}
                            style={{ minWidth: 150 }}
                        >
                            <MenuItem value={'linear'}>Linear</MenuItem>
                            <MenuItem value={'square'}>Square</MenuItem>
                        </TextField>
                        <DesktopDatePicker
                            label="Start Date"
                            value={allScheduleInfo.startDate}
                            onChange={(newDate) => {
                                dispatch(updateStartDate(JSON.parse(JSON.stringify(newDate))));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            type="number"
                            error={allScheduleInfo.numDays !== allScheduleInfo.numDaysInput}
                            label="Num Days"
                            value={allScheduleInfo.numDaysInput}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(newNumDays) => {
                                dispatch(updateNumDaysInput(newNumDays.target.value));
                                if (newNumDays.target.value !== '' && newNumDays.target.value > 0) {
                                    dispatch(updateNumDays(newNumDays.target.value));
                                }
                            }}
                            style={{ maxWidth: 150 }}
                        />
                        <TextField
                            type="number"
                            error={allScheduleInfo.hourlyChunk !== allScheduleInfo.hourlyChunkInput}
                            label="Hourly Chunk"
                            value={allScheduleInfo.hourlyChunkInput}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(newHourlyChunk) => {
                                dispatch(updateHourlyChunkInput(newHourlyChunk.target.value));
                                if (newHourlyChunk.target.value !== '' && newHourlyChunk.target.value <= 6 && newHourlyChunk.target.value > 0) {
                                    dispatch(updateHourlyChunk(newHourlyChunk.target.value));
                                }
                            }}
                            style={{ maxWidth: 150 }}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="subtitle1" gutterBottom>
                            From {allScheduleInfo.timeInterval[0]}:00 to {allScheduleInfo.timeInterval[1]}:00
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                dispatch(clearSchedule());
                            }}>CLEAR</Button>
                    </Stack>
                    <Slider
                        getAriaLabel={() => 'Time range'}
                        value={allScheduleInfo.timeInterval}
                        onChange={(event, newValue, activeThumb) => {
                            const minDistance = 1;
                            if (!Array.isArray(newValue)) {
                                return;
                            }
                            if (newValue[1] - newValue[0] < minDistance) {
                                if (activeThumb === 0) {
                                    const clamped = Math.min(newValue[0], 100 - minDistance);
                                    dispatch(updateTimeInterval([clamped, clamped + minDistance]));
                                } else {
                                    const clamped = Math.max(newValue[1], minDistance);
                                    dispatch(updateTimeInterval([clamped - minDistance, clamped]));
                                }
                            } else {
                                dispatch(updateTimeInterval(newValue));
                            }
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={24}
                        step={1}
                        marks={[
                            { value: 0, label: '0:00', },
                            { value: 6, label: '6:00', },
                            { value: 12, label: '12:00', },
                            { value: 18, label: '18:00', },
                            { value: 24, label: '24:00', },
                        ]}
                    />
                </LocalizationProvider>
                <div>
                    <ScheduleSelector
                        selection={allScheduleInfo.schedule}
                        selectionScheme={allScheduleInfo.selectionScheme}
                        startDate={allScheduleInfo.startDate}
                        numDays={allScheduleInfo.numDays}
                        minTime={allScheduleInfo.timeInterval[0]}
                        maxTime={allScheduleInfo.timeInterval[1]}
                        hourlyChunks={allScheduleInfo.hourlyChunk}
                        timeFormat={"h:mma"}
                        onChange={(newSchedule) => {
                            let newScheduleArray = newSchedule.map((slot) => {
                                return JSON.parse(JSON.stringify(slot));
                            });
                            dispatch(updateSchedule(newScheduleArray));
                        }}
                    />
                </div>

                <Typography variant="h6" gutterBottom>
                    Timezone: {allScheduleInfo.timezone.value === undefined ?
                        allScheduleInfo.timezone : allScheduleInfo.timezone.value}
                </Typography>
                <div>
                    <TimezoneSelect className={prefersDarkMode ? 'dropdownMeunDark' : null}
                        value={allScheduleInfo.timezone}
                        onChange={(newTineZone) => {
                            dispatch(updateTimezone(newTineZone));
                        }}
                        timezones={allTimezones}
                    />
                </div>
            </Stack>
        </React.Fragment>
    );
}