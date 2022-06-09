import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import { useState } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ScheduleSelector from 'react-schedule-selector';

export default function MeetupAvailability() {
    const [timezone, setTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    /* This section of states are for the timetable */
    const [startDate, setStartDate] = useState(new Date());
    const [schedule, handleScheduleChange] = useState([]);
    const [selectionScheme, setSelectionScheme] = React.useState('linear');

    const [numDaysInput, setNumDaysInput] = React.useState(7);
    const [minTimeInput, setMinTimeInput] = React.useState(9);
    const [maxTimeInput, setMaxTimeInput] = React.useState(17);
    const [hourlyChunkInput, setHourlyChunkInput] = React.useState(1);

    const [numDays, setNumDays] = React.useState(numDaysInput);
    const [minTime, setMinTime] = React.useState(minTimeInput);
    const [maxTime, setMaxTime] = React.useState(maxTimeInput);
    const [hourlyChunk, setHourlyChunk] = React.useState(hourlyChunkInput);

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
                <TextField
                    select
                    label="Selection Scheme"
                    value={selectionScheme}
                    onChange={(newSelectionScheme) => {
                        setSelectionScheme(newSelectionScheme.target.value);
                    }}
                    style = {{minWidth: 150}}
                    >
                    <MenuItem value={'linear'}>Linear</MenuItem>
                    <MenuItem value={'square'}>Square</MenuItem>
                </TextField>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="yyyy/mm/dd"
                    mask='____/__/__'
                    value={startDate}
                    onChange={(newDate) => {
                        setStartDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TextField 
                type="number"
                error={numDays!==numDaysInput}
                label="Num Days"
                value={numDaysInput}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newNumDays)=>{
                    setNumDaysInput(newNumDays.target.value);
                    if (newNumDays.target.value!=='' && newNumDays.target.value>0) {
                        setNumDays(newNumDays.target.value);
                    }
                }} 
                style = {{maxWidth: 150}}
                />
                <TextField
                type="number"
                error={minTime!==minTimeInput}
                label="Min Time"
                value={minTimeInput}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newMinTime)=>{
                    setMinTimeInput(newMinTime.target.valueAsNumber);
                    if (newMinTime.target.value>=0) {
                        setMinTime(newMinTime.target.valueAsNumber);
                    }
                }}
                style = {{maxWidth: 150}}
                />
                <TextField
                type="number"
                error={maxTime!==maxTimeInput}
                label="Max Time"
                value={maxTimeInput}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newMaxTime)=>{
                    setMaxTimeInput(newMaxTime.target.valueAsNumber);
                    if (newMaxTime.target.value<=24 && newMaxTime.target.value>minTime) {
                        setMaxTime(newMaxTime.target.valueAsNumber);
                    }
                }}
                style = {{maxWidth: 150}}
                />
                <TextField 
                type="number"
                error={hourlyChunk!==hourlyChunkInput}
                label="Hourly Chunk"
                value={hourlyChunkInput}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newHourlyChunk)=>{
                    setHourlyChunkInput(newHourlyChunk.target.value);
                    if (newHourlyChunk.target.value!=='' && newHourlyChunk.target.value<=6 && newHourlyChunk.target.value>0) {
                        setHourlyChunk(newHourlyChunk.target.value);
                    }
                }}
                style = {{maxWidth: 150}}
                />
            </Stack>
            </LocalizationProvider>
            <div>
            <ScheduleSelector
                selection={schedule}
                selectionScheme={selectionScheme}
                startDate={startDate}
                numDays={numDays}
                minTime={minTime}
                maxTime={maxTime}
                hourlyChunks={hourlyChunk}
                timeFormat={"h:mma"}
                onChange={(newSchedule) => {
                    handleScheduleChange(newSchedule);
                }}
            />
            </div>

            <Typography variant="h6" gutterBottom>
                TimeZone
            </Typography>
            <div>
            <TimezoneSelect
                    value={timezone}
                    onChange={setTimezone}
                    timezones={allTimezones}
                />
            </div>
        </React.Fragment>
    );
}