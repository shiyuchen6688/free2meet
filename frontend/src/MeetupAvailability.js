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
import Slider from '@mui/material/Slider';

export default function MeetupAvailability() {
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [startDate, setStartDate] = useState(new Date());
    const [schedule, handleScheduleChange] = useState([]);
    const [selectionScheme, setSelectionScheme] = React.useState('linear');
    const [numDaysInput, setNumDaysInput] = React.useState(7);
    const [hourlyChunkInput, setHourlyChunkInput] = React.useState(1);
    const [numDays, setNumDays] = React.useState(numDaysInput);
    const [hourlyChunk, setHourlyChunk] = React.useState(hourlyChunkInput);
    const [timeInterval, settimeInterval] = React.useState([8, 18]);

    return (
        <React.Fragment>
            <Stack direction="column" spacing={2}>
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
            <Typography variant="h6" gutterBottom>
                Choose the starting hour and ending hour of your timetable
            </Typography>
            <Slider
                    getAriaLabel={() => 'Time range'}
                    value={timeInterval}
                    onChange={(event, newValue, activeThumb) => {
                        const minDistance = 1;
                        if (!Array.isArray(newValue)) {
                            return;
                        }
                        if (newValue[1] - newValue[0] < minDistance) {
                            if (activeThumb === 0) {
                                const clamped = Math.min(newValue[0], 100 - minDistance);
                                settimeInterval([clamped, clamped + minDistance]);
                            } else {
                                const clamped = Math.max(newValue[1], minDistance);
                                settimeInterval([clamped - minDistance, clamped]);
                            }
                        } else {
                            settimeInterval(newValue);
                        }
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={24}
                    step={1}
                    marks={[
                        {value: 0,label: '0:00',},
                        {value: 6,label: '6:00',},
                        {value: 12,label: '12:00',},
                        {value: 18,label: '18:00',},
                        {value: 24,label: '24:00',},
                      ]}
                />
            </LocalizationProvider>
            <div>
            <ScheduleSelector
                selection={schedule}
                selectionScheme={selectionScheme}
                startDate={startDate}
                numDays={numDays}
                minTime={timeInterval[0]}
                maxTime={timeInterval[1]}
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
            </Stack>
        </React.Fragment>
    );
}