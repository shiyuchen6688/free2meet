import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import { useState } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import spacetime from "spacetime";
import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import ScheduleSelector from 'react-schedule-selector';

export default function MeetupAvailability() {
    const [timezone, setTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [datetime, setDatetime] = useState(spacetime.now());

    /* This section of states are for the timetable */
    const [startDate, setStartDate] = useState(new Date());
    const [schedule, handleScheduleChange] = useState([]);
    const [selectionScheme, setSelectionScheme] = React.useState('linear');
    const [numDays, setNumDays] = React.useState(7);
    const [minTime, setMinTime] = React.useState(9);
    const [maxTime, setMaxTime] = React.useState(17);
    const [hourlyChunk, setHourlyChunk] = React.useState(1);

    useMemo(() => {
        const timezoneValue = timezone.value ?? timezone;
        setDatetime(datetime.goto(timezoneValue));
    }, [timezone]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                TimeZone
            </Typography>
            <div>
                <TimezoneSelect
                    value={timezone}
                    onChange={setTimezone}
                    timezones={allTimezones}
                />
                <div>
                    Current Date / Time in{" "}
                    {timezone.value ? timezone.value.split("/")[1] : timezone.split("/")[1]}:{" "}
                    <pre>{datetime.unixFmt("YYYY.MM.dd HH:mm:ss")}</pre>
                    <div>Selected Timezone:</div>
                    <pre>{JSON.stringify(timezone, null, 2)}</pre>
                </div>
            </div>
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
                    inputFormat="yyyy/MM/dd"
                    value={startDate}
                    onChange={(newDate) => {
                        setStartDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TextField 
                label="Num Days"
                value={numDays}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newNumDays)=>{
                    console.log(newNumDays.target);
                    setNumDays(newNumDays.target.value);
                }} 
                style = {{maxWidth: 150}}
                />
                <TextField 
                label="Min Time"
                value={minTime}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newMinTime)=>{
                    setMinTime(newMinTime.target.value);
                }}
                style = {{maxWidth: 150}}
                />
                <TextField 
                label="Max Time"
                value={maxTime}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newMaxTime)=>{
                    setMaxTime(newMaxTime.target.value);
                }}
                style = {{maxWidth: 150}}
                />
                <TextField 
                label="Hourly Chunk"
                value={hourlyChunk}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(newHourlyChunk)=>{
                    setHourlyChunk(newHourlyChunk.target.value);
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
        </React.Fragment>
    );
}