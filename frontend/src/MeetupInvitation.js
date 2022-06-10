import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import CreatableSelect from 'react-select/creatable';
import "./App.css";
import Place from './Place.js';

export default function MeetupInvitation() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    /* These are some fake data */
    const [schedule, handleScheduleChange] = useState(
        ['Sat Jun 11 2022 09:00:00 GMT-0700 (Pacific Daylight Time)',
         'Sat Jun 11 2022 10:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Sat Jun 11 2022 11:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Sat Jun 11 2022 12:00:00 GMT-0700 (Pacific Daylight Time)',
         'Mon Jun 13 2022 13:00:00 GMT-0700 (Pacific Daylight Time)', 
         'Mon Jun 13 2022 14:00:00 GMT-0700 (Pacific Daylight Time)',
         'Mon Jun 13 2022 15:00:00 GMT-0700 (Pacific Daylight Time)',
         'Mon Jun 13 2022 16:00:00 GMT-0700 (Pacific Daylight Time)']
    );
    const [options, setOptions] = useState([
        { value: 'friend_0', label: 'Sam', uid: 'sam@gmail.com' },
        { value: 'friend_1', label: 'Amy', uid: 'amy@gmail.com' }
    ]);

    const ubcLocation = {
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
        formatted_address: "Vancouver, BC V6T 1Z4, Canada",
        name: "The University of British Columbia",
        place_id: "ChIJAx7UL8xyhlQR86Iqc-fUncc",
    };

    return (
        <React.Fragment>
            <Stack direction="column" spacing={1}>
            <Typography variant="h6" gutterBottom>
                Title: Temp
            </Typography>
            <Typography variant="h6" gutterBottom>
                Details:
            </Typography>
            <Typography variant="h9" gutterBottom>
                Stub
            </Typography>
            <Typography variant="h6" gutterBottom>
                Add Friends
            </Typography>
            <div>
            <CreatableSelect className={prefersDarkMode ? 'dropdownMeunDark' : null}
                isMulti
                // onChange={(newValue,actionMeta) => {
                //     console.group('Value Changed');
                //     console.log(newValue);
                //     console.log(`action: ${actionMeta.action}`);
                //     console.groupEnd();
                //   }}
                options={options}
            />
            </div>
            <Typography variant="h6" gutterBottom>
                Location
            </Typography>
            <Place key={ubcLocation.place_id} item={ubcLocation}>

            </Place>
            <Typography variant="h6" gutterBottom>
                Time Availability
            </Typography>
            <div>
                <ScheduleSelector
                    selection={schedule}
                    numDays={7}
                    minTime={9}
                    maxTime={17}
                    startDate={new Date()}
                    dateFormat="ddd M/D"
                    renderDateCell={(time, selected, innerRef) => (
                        <div style={{ textAlign: 'center' }} ref={innerRef}>
                          {selected ? '✅' : '❌'}
                        </div>
                    )}
                    onChange={(newSchedule) => {
                        handleScheduleChange(newSchedule);
                    }}
                />
            </div>
        </Stack>
        </React.Fragment>
    );
}