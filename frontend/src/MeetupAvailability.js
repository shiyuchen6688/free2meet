import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import caLocale from 'date-fns/locale/ca';
import enLocale from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';
import * as React from 'react';
import { useState } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import spacetime from "spacetime";
import { useMemo } from 'react';

export default function MeetupAvailability() {
    const [value1, setValue1] = React.useState([null, null]);
    const localeMap = {
        "24 Hours Format": caLocale,
        "12 Hours Format": enLocale,
        "Chinese Format": zhCN,
    };
    const [locale, setLocale] = React.useState("12 Hours Format");
    const [value, setValue] = React.useState(new Date());
    const [value2, setValue2] = React.useState(new Date());
    const [timezone, setTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [datetime, setDatetime] = useState(spacetime.now());
    useMemo(() => {
        const timezoneValue = timezone.value ?? timezone;
        setDatetime(datetime.goto(timezoneValue));
    }, [timezone]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Date Range
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    startText="Start"
                    endText="End"
                    value={value1}
                    onChange={(newValue) => {
                        setValue1(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
            <Typography variant="h6" gutterBottom>
                Time Format
            </Typography>
            <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
                {Object.keys(localeMap).map((localeItem) => (
                    <ToggleButton
                        key={localeItem}
                        value={localeItem}
                        onClick={() => setLocale(localeItem)}
                    >
                        {localeItem}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Typography variant="h6" gutterBottom>
                Time Range
            </Typography>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={localeMap[locale]}
            >
                <TimePicker
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={localeMap[locale]}
            >
                <TimePicker
                    value={value2}
                    onChange={(newValue) => setValue2(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
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
                    <pre>{datetime.unixFmt("dd.MM.YY HH:mm:ss")}</pre>
                    <div>Selected Timezone:</div>
                    <pre>{JSON.stringify(timezone, null, 2)}</pre>
                </div>
            </div>
        </React.Fragment>
    );
}